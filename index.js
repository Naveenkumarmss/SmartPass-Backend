
import Express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userroutes.js";
import authRoute from "./routes/authroute.js";

const app = Express();
const PORT = 8080;

dotenv.config();
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(Express.json());
app.use(bodyParser.json());
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
});
const db = mongoose.connection;
db.on("error", (errorMessage) => console.log(errorMessage));
db.once("open", () => console.log("Connected successfully to the database"));

app.use("/api/user", userRouter);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
