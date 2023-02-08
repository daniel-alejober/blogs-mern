import expres from "express";
import validateJWT from "../jwt/validateJWT.js";
import {
  newArtitle,
  getArticlesByUser,
  allArticles,
} from "../controllers/artitleController.js";

const router = expres.Router();

router.post("/newartitle", validateJWT, newArtitle);
router.get("/user/:id", getArticlesByUser);
router.get("/all-articles", allArticles);

export default router;
