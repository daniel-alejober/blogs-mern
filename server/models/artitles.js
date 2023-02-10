import mongoose from "mongoose";

const Artitle = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const ArtitleSchema = mongoose.model("Artitle", Artitle);

export default ArtitleSchema;
