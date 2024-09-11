import Event from '../models/eventModel.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, description } = req.body;
  const newEvent = new Event({ title, description });
  
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndRemove(id);
    res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addImage = async (req, res) => {
  const { id } = req.params;
  const { fileId } = req.body;  // GridFS file ID

  try {
    const event = await Event.findById(id);
    event.images.push(fileId);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addVideo = async (req, res) => {
  const { id } = req.params;
  const { fileId } = req.body;

  try {
    const event = await Event.findById(id);
    event.videos.push(fileId);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  const { id, fileId } = req.params;

  try {
    const event = await Event.findById(id);
    event.images = event.images.filter(img => img !== fileId);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  const { id, fileId } = req.params;

  try {
    const event = await Event.findById(id);
    event.videos = event.videos.filter(vid => vid !== fileId);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
