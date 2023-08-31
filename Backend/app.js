const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const noteRouter = require("./routes/note-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);
app.use("/note", noteRouter);
mongoose
  .connect(
    `mongodb+srv://21it3001:${process.env.MONGODB_PASSWORORD}@userdetails.c9r6qow.mongodb.net/`
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
