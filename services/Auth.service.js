import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import dotenv from "dotenv"

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

export { registerService, loginService };
