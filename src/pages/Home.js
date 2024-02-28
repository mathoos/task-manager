import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../utilities/Slice';
import "./Home.scss"

function Home() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);

    const [newNoteContent, setNewNoteContent] = useState('');

    const handleAddNote = () => {
        if (newNoteContent.trim() !== '') {
            dispatch(addNote({
                id: Date.now(), // Générez un identifiant unique
                content: newNoteContent
            }));
            setNewNoteContent('');
        }
    };

    return (
        <div className="notes">

            <div className="notes_add">
                <input className="input"
                    type="text"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                />
                <button className="bouton" onClick={handleAddNote}>Add</button>
            </div>

            <div className="notes_container">
                {notes.map(note => (
                    <div key={note.id} className="notes_container-note">
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;