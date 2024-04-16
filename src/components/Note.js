import React, { useRef, useState } from 'react';
import "./Note.scss";

const Note = ({ note, tagColors, personPhotos, onClick, onDragStart, onDragEnd }) => {
    const [isDragging, setIsDragging] = useState(false);
    const noteRef = useRef(null);

    const handleDragStart = () => {
        setIsDragging(true);
        onDragStart(note);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        onDragEnd();
    };

    return (
        <div
            className={`note ${tagColors[note.tag] || 'default'} ${isDragging ? 'dragging' : ''}`}
            onClick={onClick}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            ref={noteRef}
        >
            <div className="note_content">
                <div className="note_content-title">
                    <h3>{note.title}</h3>
                    <p>{note.emote}</p>
                </div>
                <p>{note.description}</p>
                <p>{note.time}</p>
                <div className="note_content-people">
                    {note.people.map(person => (
                        <img key={person} src={personPhotos[person]} alt={person} />
                    ))}
                </div>
                <div className={`bouton bouton_tag ${tagColors[note.tag] || 'default'}`}>{note.tag}</div>
            </div>
        </div>
    );
};

export default Note;