import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../utilities/Slice';
import { personPhotos } from '../data/equipe';
import { noteContainers } from '../data/noteContainers';

import Nav from "../components/Nav";
import Header from "../components/Header";
import Form from "../components/Form";
import Note from '../components/Note'; 
import NoteDetail from "../components/NoteDetail";

import "./Home.scss";
import "../components/NotesContainer.scss";


function Home() {

    const dispatch = useDispatch();

    const [notes, setNotes] = useState(useSelector(state => state.notes));
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [selectedContainerType, setSelectedContainerType] = useState(null);
    
    const [editingNote, setEditingNote] = useState(null);
    
    const [formActive, setFormActive] = useState(false); 
    const [noteActive, setNoteActive] = useState(true);


    // OUVRIR LE FORMULAIRE
    const handleShowForm = (containerType) => {
        setFormActive(true);
        setSelectedContainerType(containerType);
    };

    // FERMER LE FORMULAIRE
    const handleCloseForm = () => {
        if (editingNote) {
            setEditingNote(null); 
        }
        setFormActive(false);
    };

    // OUVRIR UNE NOTE
    const handleShowNote = (note) => {
        setSelectedNote(note);
        setSelectedContainerType(note.container);
        setNoteActive(true)
    };
    
    // FERMER UNE NOTE
    const handleCloseNote = () => {
        setSelectedNote(null); // Ferme NoteDetail en réinitialisant selectedNote
    };

    // AJOUTER UNE NOTE
    const handleAddNote = (newNote) => {
        const updatedNotes = [...notes, { ...newNote, container: selectedContainerType }]; 
        setNotes(updatedNotes);
        dispatch(addNote({ ...newNote, container: selectedContainerType }));
        setFormActive(false);
    };  

    // SUPPRIMER UNE NOTE
    const handleDeleteNote = (noteId) => {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            const updatedNotes = [...notes];
            updatedNotes.splice(noteIndex, 1);
            setNotes(updatedNotes);
            dispatch(deleteNote(noteId));
            setNoteActive(false)
        }
    };
 
    // EDITER UNE NOTE
    const handleEditNote = (note) => {
        setEditingNote(note); 
        setFormActive(true); 
        setNoteActive(false);
    };

    // SYSTEME DE DRAG & DROP
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
                <Form             
                    selectedNote={selectedNote}
                    formActive={formActive}
                    editingNote={editingNote} 
                    handleClose={handleCloseForm}
                    handleSubmit={handleAddNote}
                />
                <div className="container_notes">
                    {noteContainers.map(({ title, containerType }) => (
                        <div className={`bloc ${containerType.toLowerCase()}`} key={containerType} onDrop={() => handleDrop(containerType)} onDragOver={(e) => e.preventDefault()}>
                            <div className="bloc_title">
                                <p className="bloc_title-number">{notes.filter(note => note.container === containerType).length}</p>
                                <h2>{title}</h2>
                            </div>
                            <div className="bloc_content">
                                {notes.filter(note => note.container === containerType).map(note => (
                                    <Note 
                                        key={note.id} 
                                        note={note}
                                        onClick={() => handleShowNote(note)}
                                        onDragStart={() => handleDragStart(note.id)}
                                        onDragEnd={handleDragEnd} 
                                        personPhotos={personPhotos} 
                                        containerType={containerType}
                                    />
                                ))}
                            </div>
                            <button className="bouton" onClick={() => handleShowForm(containerType)}>Ajouter une note</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedNote && 
                <NoteDetail 
                    note={selectedNote}
                    containerType={selectedContainerType}
                    personPhotos={personPhotos} 
                    onClose={handleCloseNote}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                    noteActive={noteActive}
                />
            }

        </div>
    );
}

export default Home;