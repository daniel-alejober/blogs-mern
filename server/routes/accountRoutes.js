import expres from "express";
import { createAccount, login } from "../controllers/accountController.js";

const router = expres.Router();

router.post("/register", createAccount);
router.post("/login", login);

export default router;
