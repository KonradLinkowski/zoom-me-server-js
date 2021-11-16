import { mkdir } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const storage = diskStorage({
  destination,
  filename,
});

function destination(req, file, cb) {
  const dir = join('photos', req.body.frame);
  mkdir(dir, { recursive: true }, (err) => cb(err, dir));
}

function filename(req, file, cb) {
  cb(null, Date.now().toString() + extname(file.originalname));
}
