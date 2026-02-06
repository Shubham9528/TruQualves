import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import connectDB from "./services/mongodbService.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Truqualves Backend");
});

app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
