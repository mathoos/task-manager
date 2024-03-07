import React from 'react';
import "./NoteDetail.scss";

const NoteDetail = ({ note, tagColors, personPhotos, onClose }) => {
    return (
        <div className="noteDetail">
            <div className="noteDetail_container">
                <button className="closeButton" onClick={onClose}>Fermer</button>
                <h3>{note.title}</h3>
                <p>{note.emote}</p>
                <p>{note.description}</p>
                <p>{note.time} - {note.day}</p>
                <div className="noteDetail_container-people">
                    {note.people.map(person => (
                        <img key={person} src={personPhotos[person]} alt={person} />
                    ))}
                </div>
                <div className={`bouton bouton_tag ${tagColors[note.tag] || 'default'}`}>{note.tag}</div> 
            </div>
        </div>
    );
};

export default NoteDetail;