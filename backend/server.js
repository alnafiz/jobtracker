const express = require("express"); // Express server framework import korlam
const mongoose = require("mongoose"); // MongoDB-r sathe connect korar jonno Mongoose
const cors = require("cors"); // Frontend theke API request allow korar jonno
require("dotenv").config(); // .env file-er variable gulo load korar jonno

const app = express(); // Express app/server instance toiri korlam

app.use(cors()); // CORS middleware enable korlam
app.use(express.json()); // JSON request body parse korar jonno

const authRoutes = require("./routes/authRoutes"); // Auth routes import
app.use("/api/auth", authRoutes); // /api/auth/register ar /api/auth/login route active holo

const applicationRoutes = require("./routes/applicationRoutes"); // Application CRUD routes import
app.use("/api/applications", applicationRoutes); // /api/applications route active holo (JWT protected)

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, message: "JobTracker backend is running" }); // Server health check route
});

const PORT = process.env.PORT || 5000; // Port number .env theke neya holo
const MONGO_URI = process.env.MONGO_URI; // .env theke MongoDB connection string neya holo

// MongoDB connect howar por server listen start korchi
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas"); // Database connect hole ei message dekhabo
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`); // Server start hole message dekhabo
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message); // Error asle reason dekhabo
    process.exit(1); // Connection fail korle server bondho kore dibo
  });
