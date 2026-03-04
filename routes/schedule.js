const Schedule = require('../models/scheduleUser');
const app = require('express');
const router = app.Router();

router.post('/AddSchedule', async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const schedule = new Schedule({
      user: req.user.id,
      title,
      description,
      date
    });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.get('/GetSchedule', async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.user.id })
      .sort({ date: 1 });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
