import React from "react";
import Card from "../UI/Card";
import "./NoteItem.css";

function NoteItem(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  // const year = props.date.getFullYear();

  function removeNote(){
    // console.log(props.id);
    props.onRemoveNote(props.id);
  }
  function updateNote(){
    // console.log(props.id);
    props.onUpdateNote(props.id);
  }
  return (
    <li className="ni-li">
      <Card className="notes_list">
          {/* <p className="note_date">{month} {day} {year} </p> */}
          <h2 className="note_title">{props.title}</h2>
        <p className="note_text">{props.Text}</p>
        <div className="btn-sec">
        <button  className="custom-btn btn-5" onClick={updateNote}>Update</button>
        <button className="custom-btn btn-5" onClick={removeNote}>Delete</button>
        </div>
      </Card>
    </li>
  );
}

export default NoteItem;
