import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import Randomstring from "randomstring";


dotenv.config()

const { SECRET_CODE } = process.env.NODE_ENV !== "production"

const registerService = async (req, res) => {
  console.log(req);
  try {
    const { name, password, email, phone_number } = req.body;

    if (!name || !password || !email || !phone_number) {
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
      phone_number,
      create_at: createdAt,
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
            _id: data._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "6h"
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
    const { email } = req.body;
    if (!email) {
      return { status: 400, message: "Missing Email" }
    }
    const user = await User.findOne({ email: email })
    if (!user) {
      return { status: 404, message: "User not found" }
    }
    let testAccount = await nodemailer.createTestAccount();
    const mailerConfig = {
      service: 'gmail',
      auth: {
        user: 'testlaravelalala@gmail.com',
        pass: 'coflwwdlhdvdnjsg'
      }
    }
    const transporter = nodemailer.createTransport(mailerConfig);
    const randomPassword = Randomstring.generate({
      length: 8,
      charset: 'alphabetic'
    });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);
    user.password = hashedPassword;
    const savedUser = await user.save();

    const message = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Home</title>
    </head>
        <body style = "margin:0;
                        padding:0;
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color:darkblue">
            <div>
                <h1 style="text-align:center;
                            margin-top: 50px;
                            color:darkblue;
                        font-size:24px">New password</h1>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">Hello <strong>${user.name}</strong></p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">We sending you your new password due to your request</p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">Please do not share this password</p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">Your new password is: </p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:30px"><strong>${randomPassword}</strong></p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">Use this password to login to your account</p>
                <p style="text-align:center;
                            margin-top: 20px;
                            color:darkblue;
                            font-size:15px">We just lazy to use the OTP, don't judge us</p>
            </div>
    </body>
    </html>`
    transporter.sendMail({
      from: '"Airbnb" <AirbnbClone@gmail.com',
      to: email,
      subject: 'Reset password',
      html: message
    })
    savedUser.password = undefined;
    return { user: savedUser, status: 200, message: "Check your email for new password" };
  }
  catch (err) {
    console.log(err)
    throw err
  }
}
export { registerService, loginService, forgotPasswordService };
