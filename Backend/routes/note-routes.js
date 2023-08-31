const express = require("express");
const {
    verifyToken
  } = require("../controllers/user-controller");
const { getAllNote, createNote, deleteNote, updateNote } = require("../controllers/note-controller");

const noteRouter=express.Router();
noteRouter.use(verifyToken);

noteRouter.get("/", getAllNote);
noteRouter.delete("/", deleteNote);
noteRouter.patch("/", updateNote);
noteRouter.post("/create", createNote);

module.exports = noteRouter;