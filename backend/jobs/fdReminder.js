const cron = require("node-cron");
const db = require("../config/db");
const sendMaturityReminder = require("../services/emailService");

cron.schedule("0 9 * * *", async () => {
  console.log("Checking FD maturity reminders...");

  try {
    const [fds] = await db.query(`
      SELECT *
      FROM fixed_deposits
      WHERE DATE(maturity_date) =
      DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    `);

    for (const fd of fds) {
      await sendMaturityReminder(fd);
      console.log(`Reminder sent to ${fd.email}`);
    }
  } catch (error) {
    console.error(error);
  }
});