import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import accountRoutes from "./routes/accountRoutes.js";
import artitlesRoutes from "./routes/artitlesRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/artitle", artitlesRoutes);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log(`Starting server in the port 8080`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
