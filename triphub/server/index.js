const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const listingRoutes = require("./routes/listing");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/report");


const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use("/uploads", express.static(uploadsDir));


const secretKey = 'secret_key';


app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/coursework' }),
  cookie: { secure: false }  
}));


app.use("/", listingRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/report", reportRoutes);

mongoose.connect('mongodb://localhost:27017/coursework', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection OPEN");
  })
  .catch(err => {
    console.log("Mongo Connection ERROR", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
