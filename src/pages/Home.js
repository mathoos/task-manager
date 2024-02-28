import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../utilities/Slice';

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
        <div>
            <h1>Notes</h1>
            <div>
                <input
                    type="text"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                />
                <button onClick={handleAddNote}>Ajouter une note</button>
            </div>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;