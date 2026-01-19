const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/event");
const Booking = require("../models/booking");
const booking = require("../models/booking");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userEmail, eventId, seatsRequired } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        availableSeats: {
          $gte: seatsRequired,
        },
      },
      { $inc: { availableSeats: -seatsRequired } },
      { new: true, session },
    );

    if (!event) throw new Error("seats not available");
    await booking.create(
      [
        {
          userEmail,
          eventId,
          seatsBooked: seatsRequired,
          totalAmount: event.price * seatsRequired,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    res.json({ success: true, remainingSeats: event.availableSeats });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
});
module.exports = router;
