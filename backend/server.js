require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const fdRoutes = require('./routes/fdRoutes');
const app = express();
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});