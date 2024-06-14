const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const hotelController = require('../controllers/hotelController');
const multer = require('multer');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/ajoutHotel', upload.single('photo'), hotelController.create);
router.get('/listeHotel', hotelController.getAllHotels); // Protection ajoutée
router.put('/updateHotels/:id', hotelController.update);
router.delete('/deleteHotels/:id', hotelController.delete);


module.exports = router;
