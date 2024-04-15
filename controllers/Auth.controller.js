import { registerService, loginService } from "../services/Auth.service.js";

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
  const { user } = await loginService(req, res);
  if (user) {
    res.status(200).json({
      status: "SUCCESS",
      message: "Signed In",
      data: user,
    });
  }
};

export { register, login };
