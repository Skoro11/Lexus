import { hashPassword, checkPassword } from "../utils/hashPassword.js";
import UserAuth from "../models/user.model.js";
import { accessTokenCreation } from "../utils/JwtSession.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
dotenv.config();

export async function RegisterUser(req, res) {
  console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.password)
    res.sendStatus(400);
  else {
    try {
      const hashedPassword = await hashPassword(req.body.password);
      const newUser = new UserAuth({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        token: null,
      });

      const savedUser = await newUser.save();
      /* db.push(newUser); */
      res
        .status(200)
        .json({ message: "Successfully created a new user", user: savedUser });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
export async function DeleteUser(req, res) {
  const { _id } = req.body;

  try {
    const deletedUser = await UserAuth.findByIdAndDelete(_id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ deletedUser: deletedUser });
  } catch (error) {
    console.log("Error deleting a user", error);
    res.status(500).json({ message: error });
  }
}
export async function EditUser(req, res) {
  const { _id, name, email } = req.body;
  try {
    const updatedUser = await UserAuth.findByIdAndUpdate(
      _id,
      { name: name, email: email },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function LoginUser(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing required credentials" });
    }

    const email = req.body.email;
    const inputPassword = req.body.password;

    const wantedUser = await UserAuth.findOne({ email: email });
    console.log("User output", wantedUser);
    console.log(email, inputPassword);
    /* const wantedUser = await db.find((user) => user.email === email); */

    if (wantedUser == null) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = wantedUser.password;

    const passwordMatch = await checkPassword(inputPassword, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      const payload = {
        id: wantedUser._id,
        email: wantedUser.email,
      };
      function CookieCreation(accessToken, name) {
        res.cookie(name, accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 1000,
        });
      }

      CookieCreation(accessTokenCreation(payload), "accessToken");
      wantedUser.refreshToken = accessTokenCreation(payload);
      res.status(200).json({
        message: "Successfully logged in",
        user: wantedUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || error.toString() });
  }
}

export async function LogoutUser(req, res) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Cookie was cleared" });
}
export async function ShowAllUsers(req, res) {
  const allUsers = await UserAuth.find();
  res.status(200).send(allUsers);
  /* res.status(200).send(db); */
}

export function generateNewAccessToken(req, res) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    res.status(403).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({ messages: "Refresh token is invalid" });
    else {
      const payload = {
        id: user.id,
        email: user.email,
      };
      const newAccessToken = accessTokenCreation(payload);
      res.status(200).json({ newAccessToken: newAccessToken });
    }
  });
}

export function Me(req, res) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ id: user.id });
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function ResendFunction(req, res) {
  const { name, email, phone, message } = req.body;
  console.log(name, email, phone, message);
  try {
    const { data, error } = await resend.emails.send({
      from: "Lexus <onboarding@resend.dev>",
      to: [`${process.env.EMAIL}`],
      subject: "Lexus contact",
      html: `<div style="font-family: Arial, sans-serif; color: #333;">
  <div style="margin-bottom: 20px">
    <strong>Sender Info:</strong><br>
    <span style="color: #555;">
      Email: <strong>${email}</strong><br>
      Name: <strong>${name}</strong><br>
      Phone: <strong>${phone}</strong>
    </span>
  </div>

  <div>
    <strong>Message:</strong><br>
    ${message}
  </div>
</div>
`,
    });
    console.log({ data });
    res.status(200).json({ message: "Email was sent" });
  } catch (error) {
    console.log("Resend error", error);
    res.status(500).json({ message: error });
  }
}
