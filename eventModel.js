import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [{ type: String }],  // Image file IDs in GridFS
  videos: [{ type: String }],  // Video file IDs in GridFS
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
