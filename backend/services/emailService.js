const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMaturityReminder = async (fd) => {
  try {
    await transporter.sendMail({
      from: `"FD Management System" <${process.env.EMAIL_USER}>`,
      to: fd.email,
      subject: "FD Maturity Reminder",
      html: `
        <h2>Fixed Deposit Maturity Reminder</h2>

        <p>Dear ${fd.customer_name},</p>

        <p>Your Fixed Deposit is nearing maturity.</p>

        <table border="1" cellpadding="8" cellspacing="0">
          <tr>
            <td><b>FD Number</b></td>
            <td>${fd.fd_number}</td>
          </tr>
          <tr>
            <td><b>Bank</b></td>
            <td>${fd.bank_name}</td>
          </tr>
          <tr>
            <td><b>Maturity Date</b></td>
            <td>${fd.maturity_date}</td>
          </tr>
          <tr>
            <td><b>Maturity Value</b></td>
            <td>₹${fd.maturity_value}</td>
          </tr>
        </table>

        <br/>

        <p>Please contact your bank for renewal or closure of the FD.</p>

        <p>Regards,<br/>FD Management System</p>
      `
    });

    console.log(`Email sent successfully to ${fd.email}`);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendMaturityReminder;