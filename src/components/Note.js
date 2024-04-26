import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { tagData } from '../utilities/Tags';
import "./Note.scss";

const Note = ({ noteId, containerType, personPhotos, onClick, onDragStart, onDragEnd }) => {
    const [isDragging, setIsDragging] = useState(false);
    const noteRef = useRef(null);

    const note = useSelector(state => state.notes.find(note => note.id === noteId));

    const handleDragStart = () => {
        setIsDragging(true);
        onDragStart(note);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        onDragEnd();
    };

    const containerClass = containerType.toLowerCase();

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
            className={`note ${containerClass} ${isDragging ? 'dragging' : ''}`}
            onClick={onClick}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            ref={noteRef}
        >
            <div className="note_content">

                <div className="note_content-top">
                    <h3 className="title">{note.title}</h3>
                </div>

                <div className="note_content-middle">
                    <p className="date">
                        {formatDate(note.date)}
                    </p>
                </div>

                <div className="note_content-bottom">
                    <div className="equipe">
                    {note.people.map(person => (
                        <img key={person} src={personPhotos.find(p => p.name === person)?.photo} alt={person} />
                    ))}
                    </div>
                    <p className={`tag ${tagData[note.tag]?.class || 'default'}`}>
                        {note.tag}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Note;