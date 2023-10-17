import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  departure: {
    type: "string",
    required: true,
  },
  arrival: {
    type: "string",
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  adult: {
    type: "string",
    required: true,
  },
  children: {
    type: "string",
  },
  class: {
    type: "string",
    required: true,
  },
  priceRange: {
    type: "string",
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

const appUserSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    required: true,
  },
});

const AppUserModel = mongoose.model("app-users", appUserSchema);

export { userModel, AppUserModel };
