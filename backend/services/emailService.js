const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

const sendMaturityReminder = async (fd) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: fd.email,
      subject: "FD Maturity Reminder",
      html: `
        <h2>Fixed Deposit Maturity Reminder</h2>

        <p>Dear ${fd.customer_name},</p>

        <p>Your FD Number <b>${fd.fd_number}</b>
        will mature on <b>${fd.maturity_date}</b>.</p>

        <p>Maturity Value: ₹${fd.maturity_value}</p>

        <p>Please contact the bank for renewal or closure.</p>
      `
    });

    console.log("Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

module.exports = sendMaturityReminder;