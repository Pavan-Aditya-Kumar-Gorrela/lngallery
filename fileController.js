import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

export const uploadFile = (req, res) => {
  res.status(200).send(req.file);
};

export const getFile = async (req, res) => {
  try {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ message: 'File not found' });
      }
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
      } else {
        res.status(404).json({ message: 'File not supported' });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
