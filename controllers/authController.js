import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  res.render("auth/login");
};
const validateUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });          // ← no role filter
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
};
const register = async (req, res) => {
  res.render("auth/register");
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({ name, email, password: hashedPassword, role });
  res.redirect("/auth/login");
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  await userModel.create({ name, email, password: hashedPassword });
  res.json({ message: "User Created" });
};

const logout = (req, res) => {
  req.session.destroy();
  res.locals.user = null;
  res.render("auth/login");
};

export { login, validateUser, register, registerUser, logout };