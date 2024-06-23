const hotelService = require('../services/hotelService');

exports.create = async (req, res) => {
  try {
    const { nom, adresse, email, telephone, prix, devise } = req.body;
    const photo = req.file ? req.file.path : null;

    console.log('Received data:', { nom, adresse, email, telephone, prix, devise, photo }); // Debugging log

    const newHotel = await hotelService.createHotel({
      nom,
      adresse,
      email,
      telephone,
      prix,
      devise,
      photo
    });

    res.status(201).json(newHotel);
  } catch (error) {
    console.error('Error in controller:', error.message); // Debugging log
    res.status(400).json({ error: error.message });
  }
};


exports.create = async (req, res) => {
  try {
    const { nom, adresse, email, telephone, prix, devise } = req.body;
    const photo = req.file ? req.file.path : null;

    const newHotel = await hotelService.createHotel({
      nom,
      adresse,
      email,
      telephone,
      prix,
      devise,
      photo
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updateData = req.body;
    const updatedHotel = await hotelService.updateHotel(hotelId, updateData);
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const hotelId = req.params.id;
    await hotelService.deleteHotel(hotelId);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
