import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./utilities/Store";

import { addProject , addNote } from "./utilities/SliceProjects";


import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const projectsFromLocalStorage = localStorage.getItem('projects');

if (projectsFromLocalStorage) {
    let parsedProjects;
    try {
        parsedProjects = JSON.parse(projectsFromLocalStorage);
    } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
    }

    if (Array.isArray(parsedProjects)) {
        parsedProjects.forEach(project => {
            store.dispatch(addProject(project));
            project.notes.forEach(note => {
                store.dispatch(addNote({ projectId: project.id, note }));
            });
        });
    } else {
        console.error('Data retrieved from localStorage is not an array:', parsedProjects);
    }
}


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
