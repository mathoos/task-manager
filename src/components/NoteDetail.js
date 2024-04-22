import React from 'react';
import { tagData } from '../utilities/Tags';
import "./NoteDetail.scss";

const NoteDetail = ({ note, containerType, personPhotos, onClose, onDelete }) => {

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

    const containerClass = containerType ? containerType.toLowerCase() : '';

    return (
        <div className={`noteDetail ${containerClass}`}>
            <div className="noteDetail_container">

                <div className="noteDetail_container-left">

                    <div className="txt">
                        <h3>{note.title}</h3>
                        {note.description && note.description.split('\n').map((line, index) => (
                            <p key={index} className="description">{line}</p>
                        ))}
                        <p className="date">{formatDate(note.date)}</p>
                    </div>
   

                    <div className="bottom">
                        <div className="equipe">
                            {note.people.map(person => (
                                <img key={person} src={personPhotos[person]} alt={person} />
                            ))}
                        </div>
                        <p className={`tag ${tagData[note.tag]?.class || 'default'}`}>
                            {note.tag}
                        </p>
                    </div>
                    
                </div>

                <div className="noteDetail_container-right">
                    <div className="noteDetail_container-right--close">
                        <button className="closeButton" onClick={onClose}></button>
                    </div>
                    <div className="noteDetail_container-right--links">         
                        <button className="bouton" onClick={handleDelete}>Dupliquer</button>
                        <button className="bouton" onClick={handleDelete}>Modifier</button>
                        <button className="bouton" onClick={handleDelete}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetail;