const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  eventID: mongoose.Schema.Types.ObjectId,
  seatsBooked: Number,
  totalAmount: Number,
  bookingTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
