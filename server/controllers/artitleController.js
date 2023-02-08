import AccountSchema from "../models/account.js";
import ArtitleSchema from "../models/artitles.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINATY_CLOUD_NAME,
  api_key: process.env.CLOUDINATY_API_KEY,
  api_secret: process.env.CLOUDINATY_API_SECRET,
});

const newArtitle = async (req, res) => {
  const { id } = req;
  const { title, summary, content, photo } = req.body;

  try {
    let photoUrl;

    if (photo.length > 0) {
      const photoCloud = await cloudinary.uploader.upload(photo, {
        folder: "blog_img",
      });
      photoUrl = photoCloud?.url;
    }
    const user = await AccountSchema.findById(id);
    const newArtitle = await ArtitleSchema.create({
      title,
      summary,
      content,
      photo: photoUrl ? photoUrl : "",
    });
    user.artitles.push(newArtitle._id);
    await user.save();
    res.status(200).json({ success: true, msg: "Article posted" });
  } catch (error) {
    res.status(500).json({ message: "Error in Server" });
  }
};

const getArticlesByUser = async (req, res) => {
  const { id } = req.params;

  try {
    //*en el populate va el nombre de la tabla
    const user = await AccountSchema.findById(id).populate("artitles");
    res.status(200).json({ success: true, articles: user.artitles });
  } catch (error) {
    res.status(500).json({ message: "Error in Server" });
  }
};

export { newArtitle, getArticlesByUser };
