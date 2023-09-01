
import React, { useState } from "react";
import "./NewNote.css";
import NoteForm from "./NoteForm";

function NewNote(props) {
  const [isEditing, setIsEditing] = useState(false);

  function saveNoteDataHandler(enteredNoteData) {
    const noteData = {
      ...enteredNoteData,
      // id: Math.random().toString(),
    };
    props.onAddNote(noteData);
    setIsEditing(false);
  }
  function startEditingHandler() {
    setIsEditing(true);
  }
  function stopEditingHandler() {
    setIsEditing(false);
  }

  return (
    <div className="new-note">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Note</button>
      )}
      {isEditing && (
        <NoteForm
          onCancel={stopEditingHandler}
          onSaveNoteData={saveNoteDataHandler}
        />
      )}
    </div>
  );
}
export default NewNote;
