import React from 'react';

const NoteDetail = ({ note, tagColors, personPhotos }) => {
    return (
        <div className="note-detail">
            <h3>{note.title}</h3>
            <p>{note.emote}</p>
            <p>{note.description}</p>
            <p>{note.time} - {note.day}</p>
            <div className="note-detail-people">
                {note.people.map(person => (
                    <img key={person} src={personPhotos[person]} alt={person} />
                ))}
            </div>
            <div className={`bouton bouton_tag ${tagColors[note.tag] || 'default'}`}>{note.tag}</div> 
        </div>
    );
};

export default NoteDetail;