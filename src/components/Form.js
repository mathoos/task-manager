import React, { useState } from 'react';
import { tagData } from '../utilities/Tags';
import "./Form.scss";

const availablePeople = ["Alice", "Bob", "Charlie", "Charlotte", "Emma"];

const Form = ({ onAddNote, handleSubmit, closeModal, modalActive, setModalActive }) => {
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [newNoteDate, setNewNoteDate] = useState('');
    const [selectedPeople, setSelectedPeople] = useState([]);

    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation(); 
        closeModal();
    };

    const handleAddNote = (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire

        if (
            newNoteTitle.trim() !== '' &&
            newNoteDescription.trim() !== '' &&
            selectedTag !== '' &&
            newNoteDate !== ''
        ) {
            const newNote = {
                id: Date.now(),
                title: newNoteTitle,
                description: newNoteDescription,
                tag: selectedTag,
                date: newNoteDate,
                people: selectedPeople
            };
            handleSubmit(newNote); // Appeler handleSubmit avec la nouvelle note
            setNewNoteTitle('');
            setNewNoteDescription('');
            setSelectedTag('');
            setNewNoteDate('');
            setSelectedPeople([]);
            setModalActive(false);
        }
    };

    return (
        <div className={`form ${modalActive ? 'active' : ''}`}>
            <button className="form_close" onClick={handleCloseButtonClick}>
                    <div className="form_close-barre form_close-barre--1"></div>
                    <div className="form_close-barre form_close-barre--2"></div>
                </button>
            <form className="form_content" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <input
                        className="input"
                        type="text"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        placeholder="Title"
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <textarea
                        className="input input_textarea"
                        value={newNoteDescription}
                        onChange={(e) => setNewNoteDescription(e.target.value)}
                        placeholder="Description"
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <select className="input" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                        <option value="">Select Tag</option>
                        {Object.keys(tagData).map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <input className="input" type="date" value={newNoteDate} onChange={(e) => setNewNoteDate(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset fieldset_people">
                    {availablePeople.map(person => (
                        <div
                            key={person}
                            className={`bouton bouton_people ${selectedPeople.includes(person) ? 'selected' : ''}`}
                            onClick={() => {
                                if (selectedPeople.includes(person)) {
                                    setSelectedPeople(selectedPeople.filter(p => p !== person));
                                } else {
                                    setSelectedPeople([...selectedPeople, person]);
                                }
                            }}
                        >
                            {person}
                        </div>
                    ))}
                </fieldset>
                <button className="bouton" type="submit" onClick={handleAddNote}>
                    Valider
                </button>
            </form>
        </div>
    );
};

export default Form;