const User = require("./../models/userSchema");
const appointment = require("./../models/appointment");

module.exports = async (req, res) => {
  const {
    firstName,
    lastName,
    licenseNo,
    age,
    make,
    model,
    year,
    plateNo,
    date,
    time,
  } = req.body;

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
  const today = new Date().toISOString().split("T")[0];
  const dateQuery = date || today; // Default to today if no date query param
  const bookedSlots = await appointment.find({ dateQuery });

  const bookedTimes = timeSlots.map((slot) =>
    bookedSlots.map((items) => {
      if (slot.time.includes(items.time)) {
        slot.isTimeSlotTaken = false;
      }
    })
  );

  if (time) {
    try {
      const findAppointment = await appointment.findOne({
        date: dateQuery,
        time: time,
      });

      if (findAppointment) {
        await appointment.findByIdAndUpdate(findAppointment._id, {
          isTimeSlotAvailable: true,
        });
      }

      await User.findByIdAndUpdate(req.session.userInfo?.userId, {
        appointmentId: findAppointment._id,
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  if ((firstName, lastName, licenseNo, age, make, model, year, plateNo)) {
    if (licenseNo.length == 8) {
      await User.findOneAndUpdate(
        { _id: req.session.userInfo.userId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            licenseNo: req.body.licenseNo,
            age: req.body.age,
            "carDetails.make": req.body.make,
            "carDetails.model": req.body.model,
            "carDetails.year": req.body.year,
            "carDetails.plateNo": req.body.plateNo,
            testType: "G2",
          },
        },
        { new: true }
      )
        .then((response) => {
          res.redirect("/g2");
        })
        .catch((err) => {
          console.log("error" + err);
        });
    } else {
      res.render("g2", {
        response: "",
        message: "",
        slotDetails: "",
        times: "",
        notBooked: false,
        pageTitle: "G2 Portal",
        errorMsg: "License Number should be 8 digits",
      });
    }
  } else {
    res.render("g2", {
      response: "",
      message: "",
      slotDetails: "",
      times: "",
      notBooked: false,
      pageTitle: "G2 Portal",
      errorMsg: "Please Enter all the details",
    });
  }
};
