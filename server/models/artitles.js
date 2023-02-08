import mongoose from "mongoose";

const Artitle = new mongoose.Schema(
  {
    title: { type: String, require: true },
    summary: { type: String, require: true },
    content: { type: String, require: true },
    photo: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const ArtitleSchema = mongoose.model("Artitle", Artitle);

export default ArtitleSchema;
