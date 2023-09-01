import NoteItem from "./NoteItem";
import './NotesList.css';

function NotesList(props) {
    if (props.items.length === 0) {
        return <h2 className="notes-list__fallback">No Notes Found</h2>
    }
    return (
        <ul className="notes-list">
        {props.items.map((note) => (
            <NoteItem 
                id={note._id}
                title={note.title}
                Text={note.body}
                date={note.date}
                onUpdateNote={props.onUpdateNote}
                onRemoveNote={props.onRemoveNote}></NoteItem>
            ))};
        </ul>)
}

export default NotesList;