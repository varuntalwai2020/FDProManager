const pool = require('../config/db');

const createFD = async (req, res) => {
  try {

    const {
      bank_name,
      fd_number,
      customer_name,
      email,
      mobile,
      principal,
      interest_rate,
      start_date,
      maturity_date,
      maturity_value,
      nominee,
      branch
    } = req.body;

    const result = await pool.query(
      `INSERT INTO fd_master
      (
      bank_name,
      fd_number,
      customer_name,
      email,
      mobile,
      principal,
      interest_rate,
      start_date,
      maturity_date,
      maturity_value,
      nominee,
      branch
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        bank_name,
        fd_number,
        customer_name,
        email,
        mobile,
        principal,
        interest_rate,
        start_date,
        maturity_date,
        maturity_value,
        nominee,
        branch
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  createFD
};