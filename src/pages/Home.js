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
    
    const [editingNote, setEditingNote] = useState(null); // Ajoutez l'état pour la note en cours d'édition
    

    const [modalActive, setModalActive] = useState(false); 
    const [noteDetailVisible, setNoteDetailVisible] = useState(true);

    const closeModal = () => {
        setModalActive(false);
    };

    const handleShowForm = (containerType) => {
        setModalActive(true);
        setSelectedContainerType(containerType);
    };

    const handleAddNote = (newNote) => {
        const updatedNotes = [...notes, { ...newNote, container: selectedContainerType }]; 
        setNotes(updatedNotes);
        dispatch(addNote({ ...newNote, container: selectedContainerType }));
        setModalActive(false);
    };

    

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setSelectedContainerType(note.container);
    };

    const handleCloseButtonClick = () => {
        if (editingNote) {
            setEditingNote(null); // Réinitialisez l'état de la note en cours d'édition uniquement si elle est en cours d'édition
        }
        closeModal();
    };


    const handleCloseNoteDetail = () => {
        setSelectedNote(null); // Ferme NoteDetail en réinitialisant selectedNote
    };

    const handleDeleteNote = (noteId) => {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            const updatedNotes = [...notes];
            updatedNotes.splice(noteIndex, 1);
            setNotes(updatedNotes);
            dispatch(deleteNote(noteId));
        }
    };
    
    // Ajoutez une fonction pour gérer l'édition d'une note
    const handleEditNote = (note) => {
        setEditingNote(note); // Mettez à jour la note sélectionnée pour édition
        setModalActive(true); // Ouvrez le formulaire de modification
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

               
                <Form 
                    handleSubmit={handleAddNote}
                    selectedNote={selectedNote}
                    modalActive={modalActive}
                    editingNote={editingNote} // Passez la note en cours d'édition
                    handleCloseButtonClick={handleCloseButtonClick}
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
                                        onClick={() => handleNoteClick(note)}
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
                    onClose={handleCloseNoteDetail}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                    noteDetailVisible={noteDetailVisible}
                />
            }

        </div>
    );
}

export default Home;