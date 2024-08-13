const appointment = require("./../models/appointment");

module.exports = async (req, res) => {
  const { time, date } = req.body;

  console.log(time, date);

  try {
    const newSlot = {
      date: date,
      time: time,
      isTimeSlotAvailable: false,
    };
    const createSlot = new appointment(newSlot);
    await createSlot.save();
    return res.redirect("/");
  } catch (err) {
    console.log("Error saving slots", err);
    // Handle the error, maybe redirect to an error page or send back an error response
    return res.status(500).send("An error occurred");
  }
};
