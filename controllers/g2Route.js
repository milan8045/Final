const userSchema = require("./../models/userSchema");
const appointment = require("./../models/appointment");

module.exports = async (req, res) => {
  const user = await userSchema.findById(req.session.userInfo.userId);
  const timeSlots = [
    {
      time: "09:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "09:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "10:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "10:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "11:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "11:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "12:00 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "12:30 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "01:00 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "01:30 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "02:00 PM",
      isTimeSlotTaken: true,
    },
  ];

  if (user && user.appointmentId) {
    const appointmentdate = await appointment.findById(user.appointmentId);

    res.render("g2", {
      response: user,
      message: "",
      slotDetails: appointmentdate,
      times: timeSlots,
      notBooked: false,
      pageTitle: "G2 Portal",
      errorMsg: "",
    });
  } else if (user) {
    const today = new Date().toISOString().split("T")[0];
    const date = req.query.date || today; // Default to today if no date query param
    const bookedSlots = await appointment.find({ date });
    const bookedTimes = timeSlots.map((slot) =>
      bookedSlots.map((items) => {
        if (
          slot.time.includes(items.time) &&
          items.isTimeSlotAvailable === false
        ) {
          slot.isTimeSlotTaken = false;
        }
      })
    );
    res.render("g2", {
      response: user,
      message: "",
      bookedTimes: bookedTimes,
      timeSlots: timeSlots,
      date: date,
      minDate: today,
      notBooked: true,
      pageTitle: "G2 Portal",
      errorMsg: "",
    });
  } else {
    res.redirect("/");
  }
};
