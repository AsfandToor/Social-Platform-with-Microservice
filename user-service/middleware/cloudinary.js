import { v2 as cloudinary } from "cloudinary"
import DataURI from 'datauri/parser.js'
import * as _ from 'dotenv'

_.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

export const getCloudinaryUrl = async (req, res, next) => {
    const dataUri = new DataURI()
    try {
        dataUri.format('.png', req.file.buffer)
        const image = req.file
        const uploadResponse = await cloudinary.uploader.upload(dataUri.content, {
            eager: [
                { width: 300, height: 300, crop: "pad" }
            ]
        })

        req.body.imageUri = uploadResponse.secure_url
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
