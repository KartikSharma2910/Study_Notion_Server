/**
 * Reset Password Token
 */
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    /* Validate email if exist or not */
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Your email is not registered!",
      });
    }

    /* Generate Token */
    const token = crypto.randomUUID();

    /* Update User by adding token and Expiry Time */
    await User.findByIdAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    /* Create URL */
    const url = `https://localhost:3000/update-password/${token}`;

    /* Send Mail to user */
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link : ${url}`
    );

    /* Return response */
    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    /* Validation */
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    /* Get user details from DB using token */
    const userDetails = await User.findOne({ token });

    /* If not user / invalid Token */
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Token is not valid",
      });
    }

    /* Token time check */
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token is expired,please resend email!",
      });
    }

    /* Hash Password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* Password Update */
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      success: false,
      message: "Password Reset Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
