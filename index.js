import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import connectToDb from "./db-utils/mongoose-connection.js";
// import userRouter from "./routes/users.js";
import authRouter from "./routes/app-users.js";
import flightRouter from "./routes/flight.js";


const app = express();

const PORT = process.env.PORT || 5000;

await connectToDb();

app.use(cors());

app.use(express.json());

{
  /**req middleware */
}
const myLogger = (req, res, next) => {
  console.log(
    new Date().toISOString(),
    `Calling ${req.url}, Method: ${req.method} `
  );
  next();
};
app.use(myLogger);

{
  /**Authentication middleware */
}
const authMiddleware = (req, res, next) => {
  const authToken = req.headers["auth-token"];
  console.log("Auth Token", authToken);

  try {
    jwt.verify(authToken, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

{
  /**route of routers */
}

app.use("/users", authMiddleware, flightRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
