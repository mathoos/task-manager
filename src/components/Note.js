import React, { useRef, useState } from 'react';
import { tagData } from '../utilities/Tags';
import "./Note.scss";

const Note = ({ note, onClick, onDragStart, onDragEnd }) => {
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

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate()).padStart(2, '0'); // Ajoute un zéro au début si nécessaire
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const today = new Date();
        const currentYear = today.getFullYear();
        const year = dateObj.getFullYear() === currentYear ? '' : `/${dateObj.getFullYear()}`;
        return `${day}/${month}${year}`;
    };
    
    return (
        <div
            className={`note ${tagData[note.tag]?.class || 'default'} ${isDragging ? 'dragging' : ''}`}
            onClick={onClick}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            ref={noteRef}
        >
            <div className="note_content">

                <div className="note_content-up">
                    <div className="tag">
                        <figure className="bouton tag_icon">
                            <img src={tagData[note.tag]?.icon} alt={note.tag} />
                        </figure>
                        <div className="bouton bouton_min">
                            {note.tag}
                        </div>
                    </div>
                    <div>
                        <p className="bouton bouton_min">
                            {formatDate(note.date)}
                        </p>
                    </div>
                </div>

                <div className="note_content-middle">
                    <h3>{note.title}</h3>
                    <p className="description">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Note;