import AccountSchema from "../models/account.js";
import bcrypt from "bcrypt";
import generatedJWT from "../jwt/generatedJWT.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINATY_CLOUD_NAME,
  api_key: process.env.CLOUDINATY_API_KEY,
  api_secret: process.env.CLOUDINATY_API_SECRET,
});

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

const homeAccount = async (req, res) => {
  const { id } = req;
  try {
    const user = await AccountSchema.findById(id).select("-password");
    res.status(200).json({ success: true, dataUser: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const profile = async (req, res) => {
  const { id } = req.params;
  const { username, password, photo } = req.body;

  try {
    let photoUrl;
    let passwordHash;
    if (photo.length > 0) {
      const photoCloud = await cloudinary.uploader.upload(photo, {
        folder: "blog_img",
      });
      photoUrl = photoCloud?.url;
    }

    if (password.length > 0) {
      const salt = bcrypt.genSaltSync(10);
      passwordHash = bcrypt.hashSync(password, salt);
    }
    const userExisting = await AccountSchema.findById(id);
    userExisting.username = username ? username : userExisting.username;
    userExisting.photo = photoUrl ? photoUrl : userExisting.photo;
    userExisting.password = passwordHash ? passwordHash : userExisting.password;

    const editUser = await userExisting.save();
    res.status(200).json({ success: true, dataUser: editUser });
  } catch (error) {
    res.status(500).json({ message: "Error in Server" });
  }
};

export { createAccount, login, homeAccount, profile };
