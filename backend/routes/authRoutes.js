import express from "express";
import {
  RegisterUser,
  LoginUser,
  ShowAllUsers,
  generateNewAccessToken,
  LogoutUser,
  Me,
  ResendFunction,
  DeleteUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/TokenVerification.js";

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.get("/users", ShowAllUsers);
router.post("/token", generateNewAccessToken);
router.delete("/logout", LogoutUser);
router.get("/me", Me);
router.post("/resend", ResendFunction);
router.delete("/delete", DeleteUser);

export default router;
