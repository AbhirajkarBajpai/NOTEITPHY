import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm(props) {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredText, setEnteredText] = useState('');

    function titleChangeHandler(event) {
        setEnteredTitle(event.target.value);
        
    };
    function textChangeHandler(event) {
        setEnteredText(event.target.value);
       
    };

    function submitHandler(event) {
        event.preventDefault();
        const noteData = {
            title: enteredTitle,
            Text: enteredText,
            date: new Date,
        };
        props.onSaveNoteData(noteData);
        setEnteredTitle('');
        setEnteredText('');
    };


    return <form onSubmit={submitHandler}>
        <div className='new-note__controls'>
            <div className='new-note__control'>
                <lable>Title</lable><br/>
                <input type='text' placeholder='Enter Title' value={enteredTitle} onChange={titleChangeHandler} />
            </div>
            <div className='new-note__control'>
                <lable>Your Note</lable><br/>
                <textarea rows="7" className='main-note' placeholder='Write Your Note Here...' value={enteredText} onChange={textChangeHandler} />
            </div>
            <div className='new-note__actions'>
                <button type='Cancel' onClick={props.onCancel}>Cancel</button>
                <button type='Submit'>Add note</button>
            </div>
        </div>
    </form>;
}

export default NoteForm;