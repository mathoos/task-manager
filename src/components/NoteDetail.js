import React from 'react';
import "./NoteDetail.scss";

const NoteDetail = ({ note, tagColors, personPhotos, onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete(note.id);
        onClose();
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
        <div className="noteDetail">
            <div className="noteDetail_container">

                <div className="noteDetail_container-left">

                    <div className="tag">
                        <div className={`bouton tag_icon ${tagColors[note.tag] || 'default'}`}>
                            {note.icone && <span className="tag-icon">{note.icone}</span>}
                        </div>
                        <div className={`bouton bouton_min ${tagColors[note.tag] || 'default'}`}>
                            {note.tag}
                        </div>
                    </div>

                    <div className="txt">
                        <h3>{note.title}</h3>
                        {note.description && note.description.split('\n').map((line, index) => (
                        <p key={index} className="description">{line}</p>
                    ))}
                        <p>{formatDate(note.date)}</p>
                    </div>

                    <div className="persons">
                        {note.people.map(person => (
                            <img key={person} src={personPhotos[person]} alt={person} />
                        ))}
                    </div>
                </div>

                <div className="noteDetail_container-right">
                    <div className="noteDetail_container-right--close">
                        <button className="closeButton" onClick={onClose}>Fermer</button>
                    </div>
                    <div className="noteDetail_container-right--links">         
                        <button className="bouton deleteButton" onClick={handleDelete}>Dupliquer</button>
                        <button className="bouton deleteButton" onClick={handleDelete}>Modifier</button>
                        <button className="bouton deleteButton" onClick={handleDelete}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetail;