const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

const configStorage = (folder) => {
	const storage = new CloudinaryStorage({
		cloudinary,
		params: {
			folder: `SDN201m/${folder}`,
			resource_type: 'auto', // để cloudinary nhận vào cái file audio/*
			allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mpeg'],
		},
	})

	return multer({ storage })
}


module.exports = configStorage