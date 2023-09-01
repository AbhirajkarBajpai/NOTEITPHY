import React, { useState, useEffect } from "react";
import "./Notes.css";
import NewNote from "./Comp/NewNote/NewNote";
import Note from "./Comp/Note/Note";
import Modal from "./Comp/UI/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;

function Notes() {
  const history = useNavigate();
  const userInfo = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
  }, [history, userInfo]);

  const [notes, setNotes] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const [editItem, setEditItem] = useState(null);
  var editNote;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/note", {
        withCredentials: true,
      });
      setNotes(response.data.data);
      console.log("notes", response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const addNoteHandler = async (note) => {
    console.log("i entered the orbit with", {
      title: note.title,
      body: note.Text,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/note/create",
        {
          title: note.title,
          body: note.Text,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        await fetchNotes(); // Assuming fetchNotes is an async function
        console.log("Note added successfully:", response.data.message);
      } else {
        console.error("Error adding note:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to remove a note
  async function removeNoteHandler(completedNoteId) {
    console.log("id", completedNoteId);
    try {
      const response = await axios.delete(`http://localhost:5000/note`, {
        headers: {
          id: completedNoteId, // Pass the id of the note you want to delete
        },
      });
      if (response.status === 201) {
        await fetchNotes();
        console.log("Note deleted successfully:", response.data.message);
      } else {
        console.error("Error deleting note:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function updateNoteHandler(noteId) {
    // Fetch the note data by its ID and update your state to edit it
    editNote = notes.find((note) => note._id === noteId);
    console.log(editNote);
    setEnteredTitle(editNote.title);
    setEnteredText(editNote.body);
    setEditItem(editNote._id); // Assuming the ID field in your Note model is "_id"
    setIsUpdating(true);
  }

  async function updateNote(event) {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5000/note/`,
        {
          title: enteredTitle,
          body: enteredText,
        },
        {
          headers: {
            id: editItem, // Pass the id of the note you want to delete
          },
        }
      );
      if (response.status === 201) {
        setIsUpdating(false);
        await fetchNotes();
        console.log("Note updated successfully:", response.data.message);
      } else {
        console.error("Error updating note:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      // Handle errors
    }
  }

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }
  function textChangeHandler(event) {
    setEnteredText(event.target.value);
  }
  return (
    <div className="Notes-page">
      {isUpdating && (
        <Modal>
          <form onSubmit={updateNote}>
            <div className="new-note__controls">
              <div className="new-note__control">
                <lable>Title</lable>
                <br />
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={enteredTitle}
                  onChange={titleChangeHandler}
                />
              </div>
              <div className="new-note__control">
                <lable>Your Note</lable>
                <br />
                <textarea
                  rows="7"
                  className="main-note"
                  placeholder="Write Your Note Here..."
                  value={enteredText}
                  onChange={textChangeHandler}
                />
              </div>
              <div className="new-note__actions">
                <button type="Submit" className="custom-btn btn-5">
                  update Note
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
      <h1 style={{ color: "lightyellow" }}>Welcome To Notes</h1>
      <NewNote onAddNote={addNoteHandler} />
      <Note
        items={notes}
        onUpdateNote={updateNoteHandler}
        onRemoveNote={removeNoteHandler}
      />
    </div>
  );
}

export default Notes;
