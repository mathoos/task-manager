import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./utilities/Store";
import { addNote } from "./utilities/Slice";
import { addProject } from "./utilities/SliceProjects";


import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const notesFromLocalStorage = localStorage.getItem('notes');
const projectsFromLocalStorage = localStorage.getItem('projects');

if (notesFromLocalStorage) {
    const parsedNotes = JSON.parse(notesFromLocalStorage);
    parsedNotes.forEach(note => {
        store.dispatch(addNote(note));
    });
}

if (projectsFromLocalStorage) { // Si des projets sont disponibles dans le localStorage
    const parsedProjects = JSON.parse(projectsFromLocalStorage);
    parsedProjects.forEach(project => {
        store.dispatch(addProject(project)); // Ajoutez chaque projet au store
    });
}


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
