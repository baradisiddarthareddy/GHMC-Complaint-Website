import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory before uploading to cloudinary

const upload = multer({ storage });

export default upload;
