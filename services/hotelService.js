const Hotel = require('../models/hotel');


exports.createHotel = async (hotelData) => {
  try {
    console.log('Hotel data to be saved:', hotelData); // Debugging log
    const hotel = new Hotel(hotelData);
    await hotel.save();
    return hotel;
  } catch (error) {
    console.error('Error creating hotel:', error.message); // Debugging log
    throw new Error('Error creating hotel: ' + error.message);
  }
};


exports.getAllHotels = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateHotel = async (hotelId, updateData) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, { new: true, runValidators: true });
    if (!updatedHotel) {
      throw new Error('Hotel not found');
    }
    return updatedHotel;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteHotel = async (hotelId) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      throw new Error('Hotel not found');
    }
    return deletedHotel;
  } catch (error) {
    throw new Error(error.message);
  }
};
