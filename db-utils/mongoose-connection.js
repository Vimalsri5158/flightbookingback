import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const username = `backend`;
const password = `Vimalsri`;


const cloudMongoUrl =`mongodb+srv://${username}:${password}@cluster0.qoymzsx.mongodb.net/?retryWrites=true&w=majority`;



const localMongoUrl ='mongodb://27017/backend'

const connectToDb = async () => {
  try {
    await mongoose.connect(cloudMongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection Successful");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectToDb;
