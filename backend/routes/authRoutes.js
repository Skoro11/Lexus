import express from "express";
import {
  RegisterUser,
  LoginUser,
  ShowAllUsers,
  generateNewAccessToken,
  LogoutUser,
  Me,
  ResendFunction,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/TokenVerification.js";

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.get("/users", authenticateToken, ShowAllUsers);
router.post("/token", generateNewAccessToken);
router.delete("/logout", LogoutUser);
router.get("/me", Me);
router.post("/resend", ResendFunction);

export default router;
