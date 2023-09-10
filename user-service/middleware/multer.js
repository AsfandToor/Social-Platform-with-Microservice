import multer from "multer";

export const multerUpload = multer({
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
    }
})