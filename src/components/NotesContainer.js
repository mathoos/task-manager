import React from 'react';
import Note from './Note';
import "./NotesContainer.scss";

function NotesContainer({ title, containerType, notes, handleNoteClick, handleDragStart, handleDragEnd, handleDrop }) {
    return (
        <div className="bloc" onDrop={() => handleDrop(containerType)} onDragOver={(e) => e.preventDefault()}>
            <div className="bloc_title">
                <h2>{title}</h2>
            </div>
            <div className="bloc_content">
                {notes.map(note => (
                    <Note 
                        key={note.id} 
                        note={note}
                        onClick={() => handleNoteClick(note)}
                        onDragStart={() => handleDragStart(note.id)}
                        onDragEnd={handleDragEnd} 
                    />
                ))}
            </div>
        </div>
    );
}

export default NotesContainer;