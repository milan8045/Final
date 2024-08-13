const appointment = require("./../models/appointment");
module.exports = async (req, res) => {
  const timeSlots = [
    {
      time: "09:00 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "09:30 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "10:00 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "10:30 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "11:00 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "11:30 AM",
      isTimeSlotTaken: false,
    },
    {
      time: "12:00 PM",
      isTimeSlotTaken: false,
    },
    {
      time: "12:30 PM",
      isTimeSlotTaken: false,
    },
    {
      time: "01:00 PM",
      isTimeSlotTaken: false,
    },
    {
      time: "01:30 PM",
      isTimeSlotTaken: false,
    },
    {
      time: "02:00 PM",
      isTimeSlotTaken: false,
    },
  ];
  const today = new Date().toISOString().split("T")[0];

  const date = req.query.date || today;

  console.log("date", date);

  const bookedSlots = await appointment.find({ date });

  console.log("bookedSlots", bookedSlots);

  const bookedTimes = timeSlots.map((slot) =>
    bookedSlots.map((items) => {
      if (slot.time.includes(items.time)) {
        slot.isTimeSlotTaken = true;
      }
    })
  );
  console.log("SLots", timeSlots[0].isTimeSlotTaken);
  res.render("appointment", {
    pageTitle: "Appointment",
    errorMsg: "",
    bookedTimes: bookedTimes,
    timeSlots: timeSlots,
    date: date,
    minDate: today,
  });
};
