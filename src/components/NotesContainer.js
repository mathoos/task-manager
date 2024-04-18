import React from 'react';
import Note from './Note';
import "./NotesContainer.scss";

function NotesContainer({ title, containerType , personPhotos,  notes, handleNoteClick, handleDragStart, handleDragEnd, handleDrop, handleShowForm }) {
    return (
        <div className={`bloc ${containerType.toLowerCase()}`} onDrop={() => handleDrop(containerType)} onDragOver={(e) => e.preventDefault()}>
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
                        personPhotos={personPhotos} 
                    />
                ))}
            </div>
                <button className="bouton" onClick={() => handleShowForm(containerType)}>Ajouter une note</button>
        </div>
    );
}

export default NotesContainer;