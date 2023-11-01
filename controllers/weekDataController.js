const WeekData = require('../models/WeekData');

exports.getWeekData = async (req, res) => {
  try {
    const existingData = await WeekData.find({ user_id: req.user.id });

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const now = new Date();
    const day = now. getDay(); 
    console.log(days[day]);
    console.log(req.user.id)
    
    if(existingData.length==0){
        const data = 
           [
              {
                id: 1,
                name: "Monday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 2,
                name: "Tuesday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 3,
                name: "Wednesday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 4,
                name: "Thursday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 5,
                name: "Friday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 6,
                name: "Saturday",
                text: "",
                user_id: req.user.id,
              },
              {
                id: 7,
                name: "Sunday",
                text: "",
                user_id: req.user.id,
              },
            ]
            
            const insertedData = await WeekData.insertMany(data);
            return res.status(200).json(insertedData);
    }
    return res.json({ weekData: existingData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
};

  
exports.updateWeekData = async (req, res) => {
  const id = req.params.id;
  const newText = req.body.text;

  try {
    let dayData = await WeekData.findOne({id})
    console.log(dayData);
    if(!dayData || !newText.trim()){
        return res.status(404).send({message: "You have entered a wrong id."})
    }
    dayData.text = newText.trim();
    await WeekData.updateOne({id},dayData);
    res.json(dayData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating data' });
  }
};
