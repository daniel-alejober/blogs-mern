import expres from "express";
import {
  createAccount,
  login,
  homeAccount,
  profile,
} from "../controllers/accountController.js";
import validateJWT from "../jwt/validateJWT.js";

const router = expres.Router();

router.post("/register", createAccount);
router.post("/login", login);
router.get("/home", validateJWT, homeAccount);
router.put("/userprofile/:id", profile);

export default router;
