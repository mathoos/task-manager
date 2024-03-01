import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, editNote } from '../utilities/Slice';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns'; // Importer les fonctions nécessaires depuis date-fns
import poubelle from "../img/icons/poubelle.png";
import edit from "../img/icons/edit.png";
import alicePhoto from "../img/people/alice.jpg";
import bobPhoto from "../img/people/bob.jpg";
import charliePhoto from "../img/people/charlie.jpg";
import charlottePhoto from "../img/people/charlotte.jpg";
import emmaPhoto from "../img/people/emma.jpg";
import "./Home.scss";

const availableTags = ["gestion de projet", "production", "développement", "design"];
const availableEmotes = ["😊", "👍", "❤️", "🎉", "🚀"];
const availablePeople = ["Alice", "Bob", "Charlie", "Charlotte", "Emma"];

// Objet JavaScript pour mapper les tags aux couleurs CSS
const tagColors = {
    "gestion de projet": "blue",
    "production": "green",
    "développement": "orange",
    "design": "pink",
};

const personPhotos = {
    "Alice": alicePhoto,
    "Bob": bobPhoto,
    "Charlie": charliePhoto,
    "Charlotte": charlottePhoto,
    "Emma": emmaPhoto
};

function Home() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);

    const [editNoteState, setEditNoteState] = useState(null);

    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [newNoteTime, setNewNoteTime] = useState('');
    const [selectedEmote, setSelectedEmote] = useState('');
    const [selectedDay, setSelectedDay] = useState(''); // State pour stocker le jour sélectionné par l'utilisateur
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [formActive, setFormActive] = useState(false); // Etat local pour gérer la visibilité du formulaire

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Premier jour de la semaine actuelle

    const getColorClass = (tag) => {
        return tagColors[tag] || tagColors.default;
    };

    const handleAddNote = () => {
        if (
            newNoteTitle.trim() !== '' &&
            newNoteDescription.trim() !== '' &&
            selectedTag !== '' &&
            newNoteTime !== '' &&
            selectedEmote !== '' &&
            selectedDay !== ''
        ) {
            dispatch(addNote({
                id: Date.now(), // Générer un identifiant unique
                title: newNoteTitle,
                description: newNoteDescription,
                tag: selectedTag,
                time: newNoteTime,
                emote: selectedEmote,
                day: selectedDay, // Ajouter le jour sélectionné à la note
                people: selectedPeople
            }));
            setEditNoteState(null);
            setNewNoteTitle('');
            setNewNoteDescription('');
            setSelectedTag('');
            setNewNoteTime('');
            setSelectedEmote('');
            setSelectedDay('');
            setSelectedPeople([]);
            setFormActive(false); // Réinitialiser la visibilité du formulaire après l'ajout d'une note
        }
    };

    const handleEditNote = () => {
        if (
            editNoteState &&
            newNoteTitle.trim() !== '' &&
            newNoteDescription.trim() !== '' &&
            selectedTag !== '' &&
            newNoteTime !== '' &&
            selectedEmote !== '' &&
            selectedDay !== ''
        ) {
            dispatch(
                editNote({
                    id: editNoteState.id,
                    title: newNoteTitle,
                    description: newNoteDescription,
                    tag: selectedTag,
                    time: newNoteTime,
                    emote: selectedEmote,
                    day: selectedDay,
                    people: selectedPeople
                })
            );
            setNewNoteTitle('');
            setNewNoteDescription('');
            setSelectedTag('');
            setNewNoteTime('');
            setSelectedEmote('');
            setSelectedDay('');
            setSelectedPeople([]);
            setEditNoteState(null); // Réinitialiser l'état d'édition après la modification de la note
            setFormActive(false); // Réinitialiser la visibilité du formulaire après la modification de la note
        }
    };

    const handleEditClick = (note) => {
        setEditNoteState(note); // Utilisez setEditNoteState pour mettre à jour l'état local
        setNewNoteTitle(note.title);
        setNewNoteDescription(note.description);
        setSelectedTag(note.tag);
        setNewNoteTime(note.time);
        setSelectedEmote(note.emote);
        setSelectedDay(note.day);
        setSelectedPeople(note.people);
        setFormActive(true); // Ouvrir le formulaire pour l'édition
    };


    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
    };

    const handleAddNoteForDay = (day) => {
        setSelectedDay(day);
        setFormActive(true);
    };

    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

    const handleNextWeek = () => {
        setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    };

    const handlePreviousWeek = () => {
        setCurrentWeekStart(subWeeks(currentWeekStart, 1));
    };

    const daysWithDates = daysOfWeek.map((day, index) => {
        const currentDate = addDays(currentWeekStart, index);
        const dateForDay = format(currentDate, 'dd/MM/yyyy');
        const isCurrentDay = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'); // Vérifiez si le jour est le jour actuel
        return { day, dateForDay, isCurrentDay };
    });

    return (
        <div className="container">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>Previous Week</button>
                <span>{format(currentWeekStart, 'dd/MM/yyyy')} - {format(addDays(currentWeekStart, 4), 'dd/MM/yyyy')}</span>
                <button onClick={handleNextWeek}>Next Week</button>
            </div>

            <div className={`container_form ${formActive ? 'active' : ''}`}>
                <div className="container_form-content">
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

                    <button className="bouton" onClick={formActive ? (editNoteState ? handleEditNote : handleAddNote) : () => setFormActive(true)}>
                        {editNoteState ? 'Modifier' : 'Valider'}
                    </button>
                </div>
            </div>

            <div className="container_content">
                {daysWithDates.map(({ day, dateForDay, isCurrentDay }) => (
                    <div key={day} className={`container_content-day ${isCurrentDay ? 'active' : ''}`}>
                        <h2 className="container_content-day--title">{day} - {dateForDay}</h2>
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
                                        <p>{note.time}</p>
                                        <div className="note_content-people">
                                            {note.people.map(person => (
                                                <img key={person} src={personPhotos[person]} alt={person} />
                                            ))}
                                        </div>
                                        <div className={`bouton bouton_tag ${getColorClass(note.tag)}`}>{note.tag}</div>
                                    </div>

                                    <div className="note_update">
                                        <button
                                            className="bouton bouton_icon"
                                            onClick={() => handleDeleteNote(note.id)}>
                                            <img src={poubelle} alt="Poubelle" />
                                        </button>
                                        <button
                                            className="bouton bouton_icon"
                                            onClick={() => handleEditClick(note)}>
                                            <img src={edit} alt="modifier" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        <button className="bouton bouton_add" onClick={() => handleAddNoteForDay(day)}>Ajouter une note</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Home;