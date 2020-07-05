const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//Initialize Express
const app = express();

// Require Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const deptRoutes = require("./routes/department");
const userRoutes = require("./routes/user");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes Middleware
app.use("/", videoRoutes);
app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/", deptRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Access Denied !" });
  }
});

//Database initialization

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/splayDB",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
