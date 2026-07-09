const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendEmail({
  to,
  subject,
  html,
  text = "",
}) {
  try {
    const info = await transporter.sendMail({
      from: `"GlobeTrekker 🌍" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return info;
  } catch (err) {
    console.error("❌ Email Error:", err);
    throw err;
  }
}

module.exports = {
  sendEmail,
};