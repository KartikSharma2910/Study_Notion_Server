const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transported = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transported.sendMail({
      from: "StudyNotion || SharmaCode - by Kartik",
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
