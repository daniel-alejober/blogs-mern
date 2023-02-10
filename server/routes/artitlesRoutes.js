import express from "express";
import validateJWT from "../jwt/validateJWT.js";
import {
  newArtitle,
  getArticlesByUser,
  allArticles,
} from "../controllers/artitleController.js";

const router = express.Router();

router.post("/newartitle", validateJWT, newArtitle);
router.get("/user/:id", getArticlesByUser);
router.get("/all-articles", allArticles);

export default router;
