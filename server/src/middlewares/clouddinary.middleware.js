import cloud from 'cloudinary'
const cloudinary = cloud.v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import * as dotenv from 'dotenv'
dotenv.config()

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


export default configStorage