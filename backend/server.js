// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});
// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));



///propertyroutes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes"); 

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);


const visitRoutes = require("./routes/visitRoutes");

console.log("visitRoutes object:", visitRoutes); // debug

app.use("/api/visits", (req, res, next) => {
  console.log("VISITS ROUTE HIT:", req.url);
  next();
});

app.use("/api/visits", visitRoutes);

//move in routes
const moveInRoutes = require("./routes/moveinRoutes");

app.use("/api/movein", moveInRoutes);

//ticket routes
const ticketRoutes = require("./routes/ticketRoutes");

app.use("/api/tickets", ticketRoutes);

app.get("/api/test", (req, res) => {
  res.send("SERVER ROUTE WORKING");
});
app.get("/whoami", (req, res) => {
  res.send("THIS IS THE REAL SERVER 🚀");
});
// start server
const PORT = 7000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

