// import multer from 'multer'
// import path from 'path'
// import fs from 'fs'

// if (!fs.existsSync('uploads')) {
//     fs.mkdirSync('uploads')
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage })

// export default upload


import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});

export default upload;