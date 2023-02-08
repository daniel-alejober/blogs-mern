import expres from "express";
import validateJWT from "../jwt/validateJWT.js";
import {
  newArtitle,
  getArticlesByUser,
} from "../controllers/artitleController.js";

const router = expres.Router();

router.post("/newartitle", validateJWT, newArtitle);
router.get("/user/:id", getArticlesByUser);

export default router;
