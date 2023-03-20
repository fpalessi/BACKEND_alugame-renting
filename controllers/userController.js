import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const validation = await User.findOne({ email });
  if (validation) {
    const error = new Error(
      `Ya existe un usuario registrado con este mismo correo -> ${email}`
    );
    return res.status(400).json({ msg: error.message });
  }
  const bcryptSalt = bcrypt.genSaltSync(4);
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({
      msg: `Usuario creado correctamente con los siguientes datos: ${user}`,
    });
  } catch (error) {
    res.status(402).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validations
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error(
      `No existe ningún usuario con el correo que has introducido (${email})`
    );
    return res.status(404).json({ msg: error.message });
  } else {
    // Email user does exist, compare the passwords
    const pwdMatch = bcrypt.compareSync(password, user.password);
    if (pwdMatch) {
      // If both pwd matches, login jwt is signed
      jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      const error = new Error("La contraseña introducida no es correcta");
      return res.status(403).json({ msg: error.message });
    }
  }
};

const profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, cookieData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(cookieData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

export { register, login, profile, logout };
