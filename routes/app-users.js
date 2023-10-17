import express from "express";
import { AppUserModel } from "../routes/models.js";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

const authRouter = express.Router();

// POST request to register a user
authRouter.post("/register", async (req, res) => {
  try {
    const payload = req.body;

    // Check if a user with the same email already exists
    const existingUser = await AppUserModel.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create a new user document
    const newUser = new AppUserModel({
      id: v4(),
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: "admin",
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error in registration" });
  }
});

// GET request to fetch a student by email
authRouter.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const appUser = await AppUserModel.findOne(
      { email },
      {
        id: 1,
        name: 1,
        email: 1,
      }
    );

    if (appUser) {
      res.send(appUser);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
    res.send(appUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error occurred while fetching user" });
  }
});

// POST request for login
authRouter.post("/login", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.email) {
      res.status(404).send({ msg: "Email is Required" });
    }
    const appUser = await AppUserModel.findOne({
      email: payload.email,
    });

    if (appUser) {
      // Compare the provided password with the hashed password in the database
      await bcrypt.compare(
        payload.password,
        appUser.password,
        (_err, result) => {
          if (!result) {
            res.status(401).send({ msg: "Invalid credentials" });
          } else {
            const responseObj = appUser.toObject();
            delete responseObj.password;
            const accessToken = jwt.sign(
              {
                role: responseObj.role,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );

            delete responseObj.role;
            res.send({ ...responseObj, accessToken });
          }
        }
      );
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error occurred while logging in" });
  }
});
export default authRouter;
