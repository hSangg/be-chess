import { registerService, loginService, forgotPasswordService } from "../services/Auth.service.js";

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
  const { user, token } = await loginService(req, res);
  if (user) {
    res.status(200).json({
      status: "SUCCESS",
      message: "Signed In",
      data: user,
      token: token
    });
  }
};

const forgotPassword = async (req, res) => {
  const { user, status, message } = await forgotPasswordService(req, res);
  if (user) {
    res.status(status).json({
      status: "SUCCESS",
      message: message,
      data: user
    })
  }
  else {
    res.status(status).json({
      status: "FAILED",
      message: message
    })
  }
}
export { register, login, forgotPassword };
