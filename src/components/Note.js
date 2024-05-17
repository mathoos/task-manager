import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { tagData } from '../utilities/Tags';
import "./Note.scss";

const Note = ({ noteId, containerType, personPhotos, onClick }) => {

    const noteRef = useRef(null);

    const note = useSelector(state => {
        const { projects } = state;
        const project = projects.find(project => project.notes.some(note => note.id === noteId));
        return project ? project.notes.find(note => note.id === noteId) : null;
    });

    if (!note) {
        return null; // Si la note spécifique n'est pas trouvée dans le projet, retourne null
    }

    const containerClass = containerType.toLowerCase();

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate()).padStart(2, '0'); 
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const today = new Date();
        const currentYear = today.getFullYear();
        const year = dateObj.getFullYear() === currentYear ? '' : `/${dateObj.getFullYear()}`;
        return `${day}/${month}${year}`;
    };
    
    return (
        <div
            className={`note ${containerClass}`}
            onClick={onClick}
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