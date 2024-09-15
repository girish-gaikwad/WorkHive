import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials: true,
    // options: {
    //   sameSite: "none",
    //   secure: process.env.NODE_ENV === "production"
    // }
  }
));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/connections", connectionRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
