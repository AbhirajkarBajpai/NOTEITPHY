const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  }
},
{
    versionKey:false,
  });

module.exports = mongoose.model("Note", noteSchema);

// users
