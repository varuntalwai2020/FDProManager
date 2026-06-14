require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const pool = require('./config/db');
const fdRoutes = require('./routes/fdRoutes');

require("./jobs/fdReminder");

app.use(cors());
app.use(express.json());

app.use('/api/fd', fdRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database Connected',
      time: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
const sendMaturityReminder = require("./services/emailService");

app.get("/test-email", async (req, res) => {
  try {
    await sendMaturityReminder({
      customer_name: "Test User",
      fd_number: "FD001",
      maturity_date: "2026-06-20",
      maturity_value: "105000",
      email: "YOUR_EMAIL@gmail.com"
    });

    res.send("Email Sent");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});