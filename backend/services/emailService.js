const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "varuntalwai2020@gmail.com",
    pass: "ufyxlmnaxirgssdz"
  }
});

const sendMaturityReminder = async (fd) => {
  await transporter.sendMail({
    from: "varuntalwai2020@gmail.com",
    to: fd.email,
    subject: "FD Maturity Reminder",
    html: `
      <h2>Fixed Deposit Maturity Reminder</h2>

      <p>Dear ${fd.customer_name},</p>

      <p>Your FD Number <b>${fd.fd_number}</b>
      will mature on <b>${fd.maturity_date}</b>.</p>

      <p>Maturity Value:
      ₹${fd.maturity_value}</p>

      <p>Please contact the bank for renewal or closure.</p>
    `
  });
};

module.exports = sendMaturityReminder;