import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, updateNote } from '../utilities/Slice';
import "./Home.scss";

const availableTags = ["gestion de projet", "production", "développement", "design"];
const availableEmotes = ["😊", "👍", "❤️", "🎉", "🚀"];

// Objet JavaScript pour mapper les tags aux couleurs CSS
const tagColors = {
    "gestion de projet": "blue",
    "production": "green",
    "développement": "orange",
    "design": "pink",
};

function Home() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);

    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [newNoteTime, setNewNoteTime] = useState('');
    const [selectedEmote, setSelectedEmote] = useState('');
    const [selectedDay, setSelectedDay] = useState(''); // State pour stocker le jour sélectionné par l'utilisateur

    const getColorClass = (tag) => {
        return tagColors[tag] || tagColors.default;
    };

    const handleAddNote = () => {
        if (newNoteTitle.trim() !== '' && newNoteDescription.trim() !== '' && selectedTag !== '' && newNoteTime !== '' && selectedEmote !== '' && selectedDay !== '') {
            dispatch(addNote({
                id: Date.now(), // Générer un identifiant unique
                title: newNoteTitle,
                description: newNoteDescription,
                tag: selectedTag,
                time: newNoteTime,
                emote: selectedEmote,
                day: selectedDay // Ajouter le jour sélectionné à la note
            }));
            setNewNoteTitle('');
            setNewNoteDescription('');
            setSelectedTag('');
            setNewNoteTime('');
            setSelectedEmote('');
            setSelectedDay('');
        }
    };

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
    };

    const handleEditNote = (id, title, description, tag, time, emote) => {
        dispatch(updateNote({
            id,
            title,
            description,
            tag,
            time,
            emote
        }));
    };

    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

    return (
        <div className="container">

            <div className="container_form">
                <input className="input" type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} placeholder="Title" />
                <textarea className="input" value={newNoteDescription} onChange={(e) => setNewNoteDescription(e.target.value)} placeholder="Description" />
                <select className="input" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                    <option value="">Select Tag</option>
                    {availableTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
                <input className="input" type="time" value={newNoteTime} onChange={(e) => setNewNoteTime(e.target.value)} />
                <select className="input" value={selectedEmote} onChange={(e) => setSelectedEmote(e.target.value)}>
                    <option value="">Select Emote</option>
                    {availableEmotes.map(emote => (
                        <option key={emote} value={emote}>{emote}</option>
                    ))}
                </select>
                <select className="input" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                    <option value="">Select Day</option>
                    {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <button className="bouton" onClick={handleAddNote}>Add</button>
            </div>

            <div className="container_content">
                {daysOfWeek.map(day => (
                    <div key={day} className="container_content-day">
                        <h2 className="container_content-day--title">{day}</h2>
                        {notes
                            .filter(note => note.day === day)
                            .sort((a, b) => {
                                const timeA = new Date(`1970-01-01T${a.time}`);
                                const timeB = new Date(`1970-01-01T${b.time}`);
                                return timeA - timeB;
                            })
                            .map(note => (
                                <div key={note.id} className={`note ${getColorClass(note.tag)}`}>
                                    <div className="note_content">
                                        <div className="note_content-title">
                                            <h3>{note.title}</h3>
                                            <p>{note.emote}</p>
                                        </div>
                                        <p>{note.description}</p>
                                        <div className={`bouton bouton_tag ${getColorClass(note.tag)}`}>{note.tag}</div>
                                        <p>Time: {note.time}</p>
                                    </div>
                                    
                                    
                                    <div className="note_update">
                                        <button className="bouton" onClick={() => handleDeleteNote(note.id)}>Delete</button>
                                        <button className="bouton" onClick={() => handleEditNote(note.id, note.title, note.description, note.tag, note.time, note.emote)}>Edit</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;