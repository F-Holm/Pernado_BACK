import multer, {Multer, StorageEngine} from 'multer';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imagenes/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload: Multer = multer({ storage: storage });

export default upload;
