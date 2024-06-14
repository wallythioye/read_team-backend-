const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Importez vos routes
const hotelController = require('../controllers/hotelController');

app.post('/api/users/ajoutHotel', upload.single('photo'), hotelController.create);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
