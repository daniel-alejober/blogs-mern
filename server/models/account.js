import mongoose from "mongoose";

const Account = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  token: { type: String },
});

const AccountSchema = mongoose.model("Account", Account);

export default AccountSchema;
