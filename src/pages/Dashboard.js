import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, updateNote, duplicateNote } from '../utilities/Slice';
import { personPhotos } from '../data/equipe';
import { noteContainers } from '../data/noteContainers';

import Nav from "../components/Nav";
import Form from "../components/Form";
import Note from '../components/Note'; 
import NoteDetail from "../components/NoteDetail";

import "./Dashboard.scss";
import "../components/NotesContainer.scss";


function Dashboard() {

    const { title } = useParams();

    const dispatch = useDispatch();

    const [notes, setNotes] = useState(useSelector(state => state.notes));
    const [selectedNote, setSelectedNote] = useState(null);
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
        setSelectedNote(null); 
    };

    // AJOUTER UNE NOTE
    const handleAddNote = (newNote) => {
        if (editingNote) {
            const updatedNote = { ...editingNote, ...newNote };
            dispatch(updateNote({ id: editingNote.id, updatedNote }));
            setEditingNote(null);
        } else {
            const updatedNotes = [...notes, { ...newNote, container: selectedContainerType }];
            setNotes(updatedNotes);
            dispatch(addNote({ ...newNote, container: selectedContainerType }));
        }
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

    // DUPLIQUER UNE NOTE
    const handleDuplicateNote = (note) => {
        const newNote = { ...note, id: Date.now() }; 
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes); 
        dispatch(duplicateNote(newNote)); 
        setNoteActive(false);
    };

    return (
        <div className="dashboard">
            <Nav/>
            <div className="container">
                <div className="container_title">
                    <h1>{title}</h1>
                </div>
                <Form             
                    selectedNote={selectedNote}
                    formActive={formActive}
                    editingNote={editingNote} 
                    onClose={handleCloseForm}
                    onSubmit={handleAddNote}
                />
                <div className="container_notes">
                    {noteContainers.map(({ title, containerType }) => (
                        <div className={`bloc ${containerType.toLowerCase()}`} key={containerType}>
                            <div className="bloc_title">
                                <p className="bloc_title-number">{notes.filter(note => note.container === containerType).length}</p>
                                <h2>{title}</h2>
                            </div>
                            <div className="bloc_content">
                                {notes.filter(note => note.container === containerType).map(note => (
                                    <Note 
                                        key={note.id} 
                                        noteId={note.id}
                                        onClick={() => handleShowNote(note)}
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
                    noteId={selectedNote.id}
                    containerType={selectedContainerType}
                    personPhotos={personPhotos} 
                    onClose={handleCloseNote}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                    onDuplicate={handleDuplicateNote}
                    noteActive={noteActive}
                />
            }

        </div>
    );
}

export default Dashboard;