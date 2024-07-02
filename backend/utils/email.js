const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const catchAsync = require("./catchAsync");

dotenv.config();

const sendEmail = catchAsync(async (options) => {
  console.log({
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  });
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = { sendEmail };
