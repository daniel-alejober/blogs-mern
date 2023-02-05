import AccountSchema from "../models/account.js";
import bcrypt from "bcrypt";
import generatedJWT from "../jwt/generatedJWT.js";

const createAccount = async (req, res) => {
  const { email, password, username } = req.body;

  const userExisting = await AccountSchema.findOne({ email });
  if (userExisting) {
    const error = new Error("This email is already exists");
    return res.status(400).json({ msg: error.message });
  }
  try {
    //*encriptamos la contraseña del usuario
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    //?Para crear un nuevo elemento podemos usar los metodos .save() o .create()
    //*.save()
    //*const newAccount = new AccountSchema({email,password: passwordHash,username});
    //*const newUser = await newAccount.save();
    //*-----------------------------
    //*.create()
    const newUser = await AccountSchema.create({
      email,
      username,
      password: passwordHash,
    });

    newUser.token = generatedJWT({ id: newUser._id, username });

    res.status(200).json({ success: true, token: newUser.token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExisting = await AccountSchema.findOne({ email });
    if (!userExisting) {
      const error = new Error("This email is not associated with account");
      return res.status(400).json({ msg: error.message });
    }

    const confirmPassword = bcrypt.compareSync(password, userExisting.password);
    if (!confirmPassword) {
      const error = new Error("This password is wrong");
      return res.status(400).json({ msg: error.message });
    } else {
      userExisting.token = generatedJWT({
        id: userExisting._id,
        username: userExisting.username,
      });
      res.status(200).json({ success: true, token: userExisting.token });
      // res.cookie("token", userExisting.token).json({ success: true });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { createAccount, login };
