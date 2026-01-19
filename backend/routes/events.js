const express = require("express");
const Event = require("../models/event");
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});
router.post("/seed", async (req, res) => {
  await Event.deleteMany();
  await Event.insertMany([
    {
      title: "Tech Event",
      date: "19 Jan 2026",
      venue: "delhi",
      totalSeats: 100,
      availableSeats: 100,
      price: 100,
    },
    {
      title: "Fun Event",
      date: "25 Jan 2026",
      venue: "Lucknow",
      totalSeats: 200,
      availableSeats: 200,
      price: 200,
    },
  ]);
  res.json({ message: "Event Seeded" });
});
module.exports = router;
