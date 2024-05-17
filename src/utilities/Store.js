import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from './SliceProjects';

const saveToLocalStorage = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } 
    catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

export const saveDataToLocalStorage = (projects) => {
    // Sauvegarder chaque projet avec ses notes dans le localStorage
    const projectsWithNotes = projects.map(project => ({
        ...project,
        notes: project.notes || [] // Assurez-vous que chaque projet a un tableau de notes initialisé
    }));
    saveToLocalStorage('projects', projectsWithNotes);
};

export const store = configureStore({
    reducer: {
        projects: projectsReducer
    },
});

store.subscribe(() => {
    const state = store.getState();
    saveDataToLocalStorage(state.projects);
});