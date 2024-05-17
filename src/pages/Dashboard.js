import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addNote , deleteNote , duplicateNote, editNote } from '../utilities/SliceProjects';
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

    const projects = useSelector(state => state.projects);
    const project = projects.find(project => project.title === title);
    
    const [editingNote, setEditingNote] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedContainerType, setSelectedContainerType] = useState(null);
    
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
    const handleAddNote = (formData) => {
        if (editingNote) {
            dispatch(editNote({
                projectId: project.id,
                noteId: selectedNote.id,
                newContent: formData
            }));
        } else {
            const note = { ...formData, id: Date.now(), container: selectedContainerType };
            dispatch(addNote({ projectId: project.id, note }));
        }
        setFormActive(false);
        setEditingNote(null);
    };

    // SUPPRIMER UNE NOTE
    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote({ projectId: project.id, noteId })); 
        setNoteActive(false)
    };

    // DUPLIQUER UNE NOTE
    const handleDuplicateNote = (note) => {
        dispatch(duplicateNote({ projectId: project.id, noteId: note.id }));
        setNoteActive(false);
    };

    // EDITER UNE NOTE
    const handleEditNote = (note) => {
        setEditingNote(note); 
        setFormActive(true); 
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
                    onClose={handleCloseForm}
                    onSubmit={handleAddNote}
                    editingNote={editingNote} 
                />
                <div className="container_notes">
                    {noteContainers.map(({ title: containerTitle, containerType }) => (
                        <div className={`bloc ${containerType.toLowerCase()}`} key={containerType}>
                            <div className="bloc_title">
                                <p className="bloc_title-number">{project.notes.filter(note => note.container === containerType).length}</p>
                                <h2>{containerTitle}</h2>
                            </div>
                            <div className="bloc_content">
                  
                            {project.notes
                                    .filter(note => note.container === containerType) // Filtrer les notes par le type de conteneur
                                    .map(note => (
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
                    onDuplicate={handleDuplicateNote}
                    onEdit={handleEditNote}
                    noteActive={noteActive}
                />
            }

        </div>
    );
}

export default Dashboard;