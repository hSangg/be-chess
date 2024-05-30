import {
  registerService,
  loginService,
  forgotPasswordService,
} from "../services/Auth.service.js";

const register = async (req, res) => {
  const { user } = await registerService(req, res);
  if (user) {
    res.status(201).json({
      status: "SUCCESS",
      message: "Account created",
      data: user,
    });
  }
};

const login = async (req, res) => {
  console.log("call login")
  const { user, token } = await loginService(req, res);
  if (user) {
    res.status(200).json({
      status: "SUCCESS",
      message: "Signed In",
      data: user,
      token: token,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { status, message } = await forgotPasswordService(req, res);
  if (status == 200) {
    res.status(status).json({
      status: "SUCCESS",
      message: message,
    });
  } else {
    res.status(status).json({
      status: "FAILED",
      message: message,
    });
  }
};

export {
  forgotPassword,
  register,login
}