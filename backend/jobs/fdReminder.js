const cron = require("node-cron");
const db = require("../config/db");
const sendMaturityReminder = require("../services/emailService");

cron.schedule("0 9 * * *", async () => {
  console.log("Checking FD maturity reminders...");

  try {
    const result = await db.query(`
      SELECT *
      FROM fd_master
      WHERE maturity_date::date =
      CURRENT_DATE + INTERVAL '1 day'
    `);

    const fds = result.rows;

    for (const fd of fds) {
      await sendMaturityReminder(fd);
      console.log(`Reminder sent to ${fd.email}`);
    }

  } catch (error) {
    console.error("Reminder Error:", error);
  }
});