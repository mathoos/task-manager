import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, duplicateNote, editNote, moveNote } from '../utilities/SliceProjects';
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
    
    const notesByContainer = useMemo(() => {
        return project ? project.notes.reduce((acc, note) => {
            if (!acc[note.container]) acc[note.container] = [];
            acc[note.container].push(note);
            return acc;
        }, {}) : {};
    }, [project]);

    // Ouvrir le formulaire
    const handleShowForm = (containerType) => {
        setFormActive(true);
        setSelectedContainerType(containerType);
    };

    // Fermer le formulaire
    const handleCloseForm = () => {
        if (editingNote) {
            setEditingNote(null); 
        }
        setFormActive(false);
    };

    // Ouvrir une note
    const handleShowNote = (note) => {
        setSelectedNote(note);
        setSelectedContainerType(note.container);
        setNoteActive(true);
    };
    
    // Fermer une note
    const handleCloseNote = () => {
        setSelectedNote(null); 
    };

    // Ajouter une note
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

    // Supprimer une note
    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote({ projectId: project.id, noteId })); 
        setNoteActive(false);
    };

    // Dupliquer une note
    const handleDuplicateNote = (note) => {
        dispatch(duplicateNote({ projectId: project.id, noteId: note.id }));
        setNoteActive(false);
    };

    // Editer une note
    const handleEditNote = (note) => {
        setEditingNote(note); 
        setFormActive(true); 
        setNoteActive(false);
    };

    // Déplacer une note
    const handleDragStart = (e, noteId, containerType) => {
        e.dataTransfer.setData("noteId", noteId); // Stocker l'ID de la note à déplacer
        e.dataTransfer.setData("containerType", containerType); // Stocker le type de conteneur
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Permet de faire un drop
    };

    const handleDrop = (e, newContainerType) => {
        e.preventDefault();

        const noteId = e.dataTransfer.getData("noteId");
        const oldContainerType = e.dataTransfer.getData("containerType");

        if (newContainerType !== oldContainerType) {
            // Appeler l'action Redux pour déplacer la note dans le bon conteneur
            dispatch(moveNote({
                projectId: project.id,
                noteId: parseInt(noteId),
                newContainer: newContainerType,
            }));
        }
    };

    return (
        <div className="dashboard">
            <Nav/>
            <div className="container">
                <div className="container_title">
                    <h1>{title}</h1>
                </div>
                <Form    
                    containerType={selectedContainerType}         
                    selectedNote={selectedNote}
                    formActive={formActive}
                    onClose={handleCloseForm}
                    onSubmit={handleAddNote}
                    editingNote={editingNote} 
                />
                <div className="container_notes">
                    {noteContainers.map(({ title: containerTitle, containerType }) => (
                        <div
                            className={`bloc ${containerType.toLowerCase()}`}
                            key={containerType}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, containerType)}
                        >
                            <div className="bloc_title">
                                <p className="bloc_title-number">
                                    {notesByContainer[containerType]?.length || 0}
                                </p>
                                <h2>{containerTitle}</h2>
                            </div>
                            <div className="bloc_content">
                                {notesByContainer[containerType]?.map((note) => (
                                    <div
                                        key={note.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, note.id, containerType)} 
                                        className="note-item"
                                    >
                                        <Note 
                                            noteId={note.id}
                                            onClick={() => handleShowNote(note)}
                                            personPhotos={personPhotos} 
                                            containerType={containerType}
                                        />
                                    </div>
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