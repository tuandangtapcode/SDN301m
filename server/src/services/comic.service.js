import Comic from '../models/comic.js'
import Image from '../models/image.js'
import { response } from '../utils/lib.js'
import cloudinary from 'cloudinary'
import User from '../models/user.js'
const cloudinaryV2 = cloudinary.v2

const fncGetAllComics = async (req) => {
	try {
		const { TextSearch, CurrentPage, PageSize, isAdmin } = req.body
		let query
		if (isAdmin) {
			query = { Title: { $regex: TextSearch, $options: 'i' } }
		} else {
			query = { Title: { $regex: TextSearch, $options: 'i' }, Status: 1 }
		}
		const total = await Comic.find({ Status: 1 }).countDocuments()
		const comics = await Comic
			.find(query)
			.sort({ "createdAt": -1 })
			.skip((CurrentPage - 1) * PageSize)
			.limit(PageSize)
			.populate('Author', ['_id', 'FullName'])
			.populate('Genres', ['Title'])
		return response(
			{ List: comics, Total: total },
			false,
			'Lấy data thành công',
			200
		)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncGetAllComicsByGenres = async (req) => {
	try {
		const { TextSearch, CurrentPage, PageSize, GenreID } = req.body
		let query, queryCount
		if (!!GenreID) {
			query = {
				Title: { $regex: TextSearch, $options: 'i' },
				Genres: GenreID,
			}
			queryCount = {
				Genres: GenreID
			}
		} else {
			query = {
				Title: { $regex: TextSearch, $options: 'i' },
			}
		}
		const total = await Comic.find(queryCount).countDocuments()
		const comics = await Comic
			.find(query)
			.sort({ "createdAt": -1 })
			.skip((CurrentPage - 1) * PageSize)
			.limit(PageSize)
		if (!comics.length) {
			return response({ List: [], Total: 0 }, false, `Không tìm thấy comic có genre "${GenreID}"`, 200)
		}
		return response(
			{ List: comics, Total: total },
			false,
			'Lấy data thành công',
			200
		)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncInsertComic = async (req) => {
	try {
		const Author = req.user.ID
		const { Title } = req.body
		const comic = await Comic.findOne({ Title })
		if (comic) {
			cloudinaryV2.uploader.destroy(req.file.filename)
			return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
		}
		const create = await Comic.create({ ...req.body, AvatarPath: req.file.path, AvatarPathId: req.file.filename, Author })
		return response(create._id, false, "Thêm mới thành công", 201)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncUpdateComic = async (req) => {
	try {
		const Author = req.user.ID
		const { ComicID, Title } = req.body
		const checkExist = await Comic.findOne({ _id: ComicID, Author: Author })
		if (!checkExist) return response(checkExist, true, 'Truyện không tồn tại', 200)
		const checkExistTitle = await Comic.findOne({ Title })
		if (!!checkExistTitle && !checkExist._id.equals(checkExistTitle._id)) {
			if (!!req.file) cloudinaryV2.uploader.destroy(req.file.filename)
			return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
		}
		const updateComic = await Comic.findByIdAndUpdate({ _id: ComicID, Author: Author }, {
			...req.body,
			AvatarPath: !!req.file ? req.file.path : checkExistTitle?.AvatarPath,
			AvatarPathId: !!req.file ? req.file.filename : checkExistTitle?.AvatarPathId,
			UpdatedAt: Date.now()
		})
		return response(updateComic?._id, false, "Cập nhật thành công thành công", 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncDeleteComic = async (req) => {
	try {
		const UserID = req.user.ID
		const { ComicID } = req.body
		const deleteComic = await Comic.deleteOne({ _id: ComicID, Author: UserID })
		if (!deleteComic.deletedCount) return response({}, true, "Có lỗi khi xóa", 200)
		return response(deleteComic, false, "Xóa thành công", 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncGetDetailComic = async (req) => {
	try {
		const id = req.params.ComicID
		const comic = await Comic.findOne({ _id: id })
			.populate('Author', ['_id', 'FullName'])
			.populate('Genres', ['Title'])
		if (!comic) return response({}, true, 'Truyện không tồn tại', 200)
		return response(comic, false, 'Lấy data thành công', 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncChangeStatusComic = async (req) => {
	try {
		const { ComicID, Status } = req.body
		const updateComic = await Comic.findByIdAndUpdate({ _id: ComicID }, { Status: Status, UpdatedAt: Date.now() })
		if (!updateComic) return response({}, true, 'Truyện không tồn tại', 200)
		return response({}, false, 'Cập nhật thành công', 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncGetAllChaptersByComic = async (req) => {
	try {
		const ComicID = req.params.ComicID
		const chapters = await Comic.findOne({ _id: ComicID }).select('Chapters Title createdAt')
		if (!chapters) return response({}, true, "Có lỗi", 200)
		return response(chapters, false, "Lấy data thành công", 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}

const fncGetAllHotComics = async (req) => {
	try {
		const { FillNumber } = req.params
		let topReadComics
		const endDate = new Date()
		const startDate = new Date(endDate)
		startDate.setDate(endDate.getDate() - FillNumber)
		if (+FillNumber !== 0) {
			topReadComics = await Comic.aggregate([
				{
					$match: {
						ReadedAt: {
							$elemMatch: {
								$gte: startDate,
								$lt: endDate,
							},
						},
					},
				},
				{
					$unwind: "$ReadedAt",
				},
				{
					$match: {
						"ReadedAt": {
							$gte: startDate,
							$lt: endDate,
						},
					},
				},
				{
					$group: {
						_id: "$_id",
						Title: { $first: "$Title" },
						Reads: { $sum: 1 },
						AvatarPath: { $first: "$AvatarPath" },
						Chapters: { $first: "$Chapters" },
						Likes: { $first: "$Likes" }
					},
				},
				{
					$sort: { Reads: -1 },
				},
				{
					$limit: 4
				}
			])
		} else {
			topReadComics = await Comic.find().sort({ Reads: -1 }).limit(4)
		}
		return response(topReadComics, false, "Lấy data thành công", 200)
	} catch (error) {
		return response({}, true, error.toString(), 500)
	}
}


const ComicService = {
	fncGetAllComics,
	fncInsertComic,
	fncDeleteComic,
	fncUpdateComic,
	fncGetAllComicsByGenres,
	fncGetDetailComic,
	fncChangeStatusComic,
	fncGetAllChaptersByComic,
	fncGetAllHotComics
}

export default ComicService
