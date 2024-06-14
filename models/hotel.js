const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  prix: { type: Number, required: true },
  devise: { type: String, enum: ['XOF', 'EUR', 'USD'], required: true },
  photo: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
