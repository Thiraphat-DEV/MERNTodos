import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Todo from "./models/todos.js";
dotenv.config();
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/todos", Todo);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log(`HELLO DATABASE NOSQL ${PORT} `);
    });
  })
  .catch((err) => console.log(err.message, mongoose.connection.readyState));

app.get("/", (req, res) => {
  res.send("Welcome To HelloWorld");
});
