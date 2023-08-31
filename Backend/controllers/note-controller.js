const express = require("express");
const Note = require("../model/Notes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getAllNote = async (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    console.log("Cookie not found successfully");
  }
  const token = cookies.split("=")[1];
  if(token){
    console.log("Token found successfully!", token);
  }

  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      console.log("Invalid Found");
      return res.status(400).json({ message: "Invalid TOken" });
    }
   let data = await Note.find({user:user.id})
   res.send({
    data:data,
    message:"All Notes Found Successfully",
   })
  });
};
const createNote = async (req, res, next) => {
  console.log("i am creating");
    try {
        const note = new Note(req.body);
        await note.save();

        res.status(201).json({
            message: "Note created"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateNote = async (req, res, next) => {
  console.log("i am upreating");
  const { id } = req.headers;
  console.log(id);
    try {
        await Note.findByIdAndUpdate({_id:id},req.body);
        res.status(201).json({
            message: "Note updated"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteNote = async (req, res, next) => {
  console.log("i am dreating");
  const {id} = req.headers;
  console.log(id);
    try {
        await Note.findByIdAndDelete({_id:id})
        res.status(201).json({
            message: "Note deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllNote = getAllNote;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
