import React, { useState } from 'react';
import "./Form.scss";
import { format } from 'date-fns';

const availableTags = ["gestion de projet", "production", "développement", "design"];
const availableEmotes = ["😊", "👍", "❤️", "🎉", "🚀"];
const availablePeople = ["Alice", "Bob", "Charlie", "Charlotte", "Emma"];

const tagColors = {
    "gestion de projet": "blue",
    "production": "green",
    "développement": "orange",
    "design": "pink",
};

const Form = ({ onAddNote, formActive, setFormActive, selectedDayProp }) => {
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [newNoteTime, setNewNoteTime] = useState('');
    const [selectedEmote, setSelectedEmote] = useState('');
    const [selectedPeople, setSelectedPeople] = useState([]);

    const handleAddNote = () => {
        if (
            newNoteTitle.trim() !== '' &&
            newNoteDescription.trim() !== '' &&
            selectedTag !== '' &&
            newNoteTime !== '' &&
            selectedEmote !== '' &&
            selectedDayProp !== ''
        ) {
            const newNote = {
                id: Date.now(),
                title: newNoteTitle,
                description: newNoteDescription,
                tag: selectedTag,
                time: newNoteTime,
                emote: selectedEmote,
                day: selectedDayProp,
                people: selectedPeople
            };
            onAddNote(newNote);
            setNewNoteTitle('');
            setNewNoteDescription('');
            setSelectedTag('');
            setNewNoteTime('');
            setSelectedEmote('');
            setSelectedPeople([]);
            setFormActive(false);
        }
    };

    return (
        <div className={`form ${formActive ? 'active' : ''}`}>
            <div className="form_content">
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
                        {availableTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <input className="input" type="time" value={newNoteTime} onChange={(e) => setNewNoteTime(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset">
                    <select className="input" value={selectedEmote} onChange={(e) => setSelectedEmote(e.target.value)}>
                        <option value="">Select Emote</option>
                        {availableEmotes.map(emote => (
                            <option key={emote} value={emote}>{emote}</option>
                        ))}
                    </select>
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
                <button className="bouton" onClick={handleAddNote}>
                    Valider
                </button>
            </div>
        </div>
    );
};

export default Form;