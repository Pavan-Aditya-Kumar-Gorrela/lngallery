import express from 'express';
import multer from 'multer';
import { uploadFile, getFile } from '../controllers/fileController.js';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';

const router = express.Router();

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/gallery',
  file: (req, file) => {
    return { filename: file.originalname };
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/:filename', getFile);

export default router;
