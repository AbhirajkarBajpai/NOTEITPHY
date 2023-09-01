
import React, { useState } from 'react';
import Card from '../UI/Card';
import NotesList from './NotesList';
import './Note.css'


function Note(props) {

    return (
        <Card className='notes' >
            <NotesList items ={props.items} onUpdateNote={props.onUpdateNote} onRemoveNote={props.onRemoveNote}/>
        </Card>);
        
}
export default Note;
