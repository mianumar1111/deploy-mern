const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoModel = require("./Model/todoModel");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://mianumar1111:1234%405678@project1.bppcdpc.mongodb.net/todo",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

var port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  todoModel.create({ task: task }).then((result) => {
    res.json(result);
  });
});

app.get("/get", (req, res) => {
  todoModel.find().then((result) => {
    res.json(result);
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndUpdate(id, { status: true }, { new: true })
    .then(() => {
      return todoModel.find();
    })
    .then((result) => {
      res.json(result);
    });
});

app.put("/undone/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndUpdate(id, { status: false }, { new: true })
    .then(() => {
      return todoModel.find();
    })
    .then((result) => {
      res.json(result);
    });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndDelete(id)
    .then(() => {
      return todoModel.find();
    })
    .then((result) => {
      console.log("result", result);
      res.json(result);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
