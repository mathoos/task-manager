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
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import Nav from "../components/Nav";

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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const handleAddNote = (newNote) => {
        dispatch(addNote(newNote));
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetail = () => {
        setSelectedNote(null);
    };

    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote(noteId));
    };


    return (
        <div className="home">

            <Nav/>

            <div className="container">

                <div className="container_header">
                    <button className="bouton bouton_add" onClick={() => setIsFormVisible(true)}>Ajouter une note</button>
                </div> 

                {isFormVisible && (
                    <Form 
                        onAddNote={handleAddNote} 
                        selectedNote={selectedNote}
                        setIsVisible={setIsFormVisible}
                    />
                )}

               
                <div className="container_notes">

                    <div className="container_notes-bloc">
                        <h2>A faire</h2>
                        {notes.map(note => (
                            <Note 
                                key={note.id} 
                                note={note} 
                                tagColors={tagColors} 
                                onClick={() => handleNoteClick(note)}
                                personPhotos={personPhotos}     
                            />
                        ))}
                    </div>

                    <div className="container_notes-separation"></div>

                    <div className="container_notes-bloc">
                        <h2>En cours</h2>
                    </div>

                    <div className="container_notes-separation"></div>

                    <div className="container_notes-bloc">
                        <h2>Fait</h2>
                    </div>
                    
                </div>
       
            </div>

            {selectedNote && 
                <NoteDetail 
                    note={selectedNote} 
                    tagColors={tagColors} 
                    personPhotos={personPhotos} 
                    onClose={handleCloseNoteDetail}
                    onDelete={handleDeleteNote}
                />
            } 
        </div>
    );
}

export default Home;