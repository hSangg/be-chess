import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import {
  generateRandomFiveDigitNumberAsString,
  generateRandomPassword,
} from "../utils/function.js";

dotenv.config();

const { SECRET_CODE } = process.env.NODE_ENV !== "production";

const registerService = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }

    const createdAt = Date.now();
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,

      created_at: createdAt,
      update_at: createdAt,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;
    return { user: savedUser };
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred",
      error: err.message,
    });
    return { user: null };
  }
};

const loginService = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      res.status(400).json({
        status: 400,
        message: "Empty credentials",
      });
      return { user: null };
    }

    const data = await User.findOne({ email });
    if (data) {
      const hashedPassword = data.password;
      const result = await bcrypt.compare(password, hashedPassword);

      if (result) {
        const token = jwt.sign(
          {
            email: data.email,
            password: data.password,
            _id: data._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "6h",
          }
        );
        data.password = undefined;
        return { user: data, token: token };
      } else {
        res.status(401).json({
          status: 401,
          message: "Invalid credential",
        });
        return { user: null };
      }
    } else {
      res.status(401).json({
        status: 401,
        message: "Invalid credential",
      });

      return { user: null };
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({
      status: 401,
      error: err,
    });
    return { user: null };
  }
};
const forgotPasswordService = async (req, res) => {
  try {
    console.log("call forget password");
    const { email } = req.body;
    console.log("email: ", email)
    if (!email) {
      return { status: 400, message: "Missing Email" };
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    let testAccount = await nodemailer.createTestAccount();
    const mailerConfig = {
      service: "gmail",
      auth: {
        user: "hoai.sang050@gmail.com",
        pass: "llfm vrge vztv bufc",
      },
    };
    const transporter = nodemailer.createTransport(mailerConfig);
    
    const newPassword = generateRandomPassword();
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    const message = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Reset Password - King Chess</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #333333;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .content p {
            margin: 10px 0;
            font-size: 15px;
            color: #333333;
          }
          .password {
            font-size: 24px;
            font-weight: bold;
            color: #ff0000;
            margin: 20px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>King Chess</h1>
            </div>
            <div class="content">
                <p>Hello <strong>${user.name}</strong>,</p>
                <p>Your password has been successfully reset. Here is your new auto-generated password:</p>
                <p class="password">${newPassword}</p>
                <p>Please do not share this information with anyone.</p>
                <p>We recommend you to change this password after logging in for enhanced security.</p>
            </div>
            <div class="footer">
                <p>Thank you for using King Chess. If you did not request a password reset, please ignore this email.</p>
                <p>&copy; 2024 King Chess. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;

    await transporter.sendMail({
      from: '"King Chess" <no-reply@kingchess.com>',
      to: email,
      subject: "Reset Password - King Chess",
      html: message,
    });
    
    return { status: 200, message: "You have changed your password" };
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export {
  forgotPasswordService,
  loginService,
  registerService,
};

