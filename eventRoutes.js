import express from 'express';
import { getAllEvents, createEvent, deleteEvent, addImage, addVideo, deleteImage, deleteVideo } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/images', addImage);
router.post('/:id/videos', addVideo);
router.delete('/:id/images/:fileId', deleteImage);
router.delete('/:id/videos/:fileId', deleteVideo);

export default router;
