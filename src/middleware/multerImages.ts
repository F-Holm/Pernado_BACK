import multer, {Multer, StorageEngine} from 'multer';
import path from 'path';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/src/imagenes/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload: Multer = multer({ storage: storage });

export default upload;
