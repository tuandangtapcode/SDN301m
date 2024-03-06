import Package from "../models/package.js"
import { response } from '../utils/lib.js'

const fncInsertPackage = async (req) => {
  try {
    const { Title } = req.body
    const checkExistTitle = await Package.findOne({ Title })
    if (!!checkExistTitle) return response({}, true, "Tên gói premium đã tồn tại", 200)
    const newPackage = await Package.create(req.body)
    return response(newPackage, false, "Thêm gói premium thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdatePackage = async (req) => {
  try {
    const { id, Title } = req.body
    const checkExistPackage = await Package.findOne({ _id: id })
    if (!checkExistPackage) return response({}, true, "Package không tồn tại", 200)
    const checkExistTitle = await Package.findOne({ Title })
    if (!!checkExistTitle && !checkExistPackage._id.equals(checkExistTitle._id))
      return response({}, true, `Package ${Title} đã tồn tại`, 200)
    const updatePackage = await Package.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    return response(updatePackage, false, "Cập nhật thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllPackages = async (req) => {
  try {
    const { CurrentPage, PageSize } = req.body
    let packages
    if (!!CurrentPage && !!PageSize) {
      packages = await Package.find().skip((CurrentPage - 1) * PageSize).limit(PageSize)
    } else {
      packages = await Package.find()
    }
    return response(
      {
        List: packages, Total: packages.length
      },
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailPackage = async (req) => {
  try {
    const PackageID = req.params.PackageID
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const packageDetail = await Package.findOne({ _id: PackageID })
    if (!packageDetail) return response({}, true, "Package không tồn tại", 200)
    return response({ PackageDetail: packageDetail, ipAddress }, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const PackageService = {
  fncInsertPackage,
  fncUpdatePackage,
  fncGetAllPackages,
  fncGetDetailPackage
}

export default PackageService
