const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  venue: String,
  totalSeats: Number,
  availableSeats: Number,
  price: Number,
});
module.exports = mongoose.model("Event", eventSchema);
