import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../utilities/Slice';

import alicePhoto from "../img/people/alice.jpg";
import bobPhoto from "../img/people/bob.jpg";
import charliePhoto from "../img/people/charlie.jpg";
import charlottePhoto from "../img/people/charlotte.jpg";
import emmaPhoto from "../img/people/emma.jpg";

import "./Home.scss";

import Form from "../components/Form";
import NoteDetail from "../components/NoteDetail";
import Nav from "../components/Nav";
import Header from "../components/Header";
import NotesContainer from "../components/NotesContainer";

const personPhotos = {
    "Alice": alicePhoto,
    "Bob": bobPhoto,
    "Charlie": charliePhoto,
    "Charlotte": charlottePhoto,
    "Emma": emmaPhoto
};

const noteContainers = [
    { title: "Design", containerType: "Design" },
    { title: "Frontend", containerType: "Frontend" },
    { title: "Backend", containerType: "Backend" },
    { title: "Testing", containerType: "Testing" }
];

function Home() {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState(useSelector(state => state.notes));
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [selectedContainerType, setSelectedContainerType] = useState(null);

    const handleShowForm = (containerType) => {
        setIsFormVisible(true);
        setSelectedContainerType(containerType);
    };

    const handleAddNote = (newNote) => {
        const updatedNotes = [...notes, { ...newNote, container: selectedContainerType }]; // Utiliser le type de conteneur sélectionné pour ajouter la note
        setNotes(updatedNotes);
        dispatch(addNote({ ...newNote, container: selectedContainerType }));
        setIsFormVisible(false);
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetail = () => {
        setSelectedNote(null);
    };

    const handleDeleteNote = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);
        dispatch(deleteNote(noteId));
    };

    const handleDragStart = (noteId) => {
        setSelectedNoteId(noteId);
    };

    const handleDragEnd = () => {
        setSelectedNoteId(null);
    };

    const handleDrop = (containerType) => {
        if (selectedNoteId !== null) {
            const updatedNotes = notes.map(note => {
                if (note.id === selectedNoteId) {
                    return { ...note, container: containerType };
                }
                return note;
            });
            setNotes(updatedNotes);
        }
    };

    return (
        <div className="home">
            <Nav/>

            <div className="container">

                <Header/>

                {isFormVisible && (
                    <Form 
                        onAddNote={handleAddNote} 
                        selectedNote={selectedNote}
                        setIsVisible={setIsFormVisible}
                    />
                )}

                <div className="container_notes">
                    {noteContainers.map(({ title, containerType }) => (
                        <NotesContainer
                            key={containerType}
                            title={title}
                            containerType={containerType}
                            personPhotos={personPhotos}
                            notes={notes.filter(note => note.container === containerType)}
                            handleNoteClick={handleNoteClick}
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                            handleDrop={handleDrop}
                            handleShowForm={handleShowForm} 
                        />
                    ))}
                </div>
            </div>

            {selectedNote && 
                <NoteDetail 
                    note={selectedNote}
                    personPhotos={personPhotos} 
                    onClose={handleCloseNoteDetail}
                    onDelete={handleDeleteNote}
                />
            } 

        </div>
    );
}

export default Home;