import mongoose from "mongoose";

const Account = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  photo: { type: String },
  artitles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artitle" }],
  //*en ref es el nombre que va dentro del model entre ""
  //*mongoose.model("Artitle", Artitle);
});

const AccountSchema = mongoose.model("Account", Account);

export default AccountSchema;
