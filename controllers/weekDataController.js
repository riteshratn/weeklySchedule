const moment = require('moment');
const WeekData = require("../models/WeekData");

exports.getWeekData = async (req, res) => {
  try {
    const existingData = await WeekData.find({ user_id: req.user.id });
    const currentDay = moment().format('dddd');

    existingData.sort((a, b) => {
      const order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Notes'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

    if (existingData.length === 0) {
      const data = [
        {
          name: "Monday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Tuesday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Wednesday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Thursday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Friday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Saturday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Sunday",
          text: "",
          user_id: req.user.id,
        },
        {
          name: "Notes",
          text: "",
          user_id: req.user.id,
        },
      ];

      const insertedData = await WeekData.insertMany(data);

      return res.status(200).json({
        today: currentDay,
        weekData: insertedData,
      });
    }

    return res.json({
      today: currentDay,
      weekData: existingData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving data" });
  }
};


exports.updateWeekData = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(404).json({ message: "User not authorized" });
  }

  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Invalid or empty request data" });
    }

    const notesData = data.find((item) => item.name === 'Notes');

    if (notesData) {
      data.splice(data.indexOf(notesData), 1);
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const promises = days.map(async (day) => {
      const existingData = await WeekData.findOne({ user_id: userId, name: day });

      if (!existingData) {
        await WeekData.create({
          name: day,
          text: '',
          user_id: userId,
        });
      } else {
        const updateData = data.find((item) => item.name === day);
        if (updateData) {
          existingData.text = updateData.text;
          await existingData.save();
        }
      }
    });

    const updatedData = await WeekData.find({ user_id: userId });

    // Update the "Notes" entry if it exists
    if (notesData) {
      const notesEntry = updatedData.find((item) => item.name === 'Notes');
      if (notesEntry) {
        notesEntry.text = notesData.text;
        await notesEntry.save();
      }
    }

    return res.json({
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating data" });
  }
};
