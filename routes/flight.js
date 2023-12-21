import express from "express";

import { v4 } from "uuid";

import { flightModel } from "../db-utils/models.js";

const flightRouter = express.Router();

// GET request method
flightRouter.get("/", async (req, res) => {
  try {
    const users = await flightModel.find(
      {},
      {
        id: 1,
        flightNumber:1,
        bookingSeats:1,
        departureDate: 1,
        returnDate: 1,
        children: 1,
        class: 1,
        priceRange: 1,
        _id: 0,
        adult: 1,
        departure: 1,
        arrival: 1,
      }
    );
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error occurred while fetching users" });
  }
});

// POST request method
flightRouter.post("/", async (req, res) => {
  try {
    const user = new flightModel({ ...req.body, id: v4() });
    await user.save();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error creating user" });
  }
});

// PUT request method
flightRouter.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await flightModel.updateOne({ id: userId }, { $set: req.body });
    res.send({ msg: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error updating user" });
  }
});

// DELETE request method
flightRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await flightModel.deleteOne({ id: userId });
    res.send({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error deleting user" });
  }
});

export default flightRouter;
