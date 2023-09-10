import express from 'express'
import { UserController } from '../controller/user.js'
import { multerUpload } from '../middleware/multer.js'
import { getCloudinaryUrl } from '../middleware/cloudinary.js'

const router = express.Router()
const Controller = new UserController()

router.get('/', Controller.getAllUsers)

router.get('/:id', Controller.getUserDetail)

router.post('/upload', multerUpload.single("image"), getCloudinaryUrl, Controller.upload)

router.post('/register', Controller.register)


export default router
