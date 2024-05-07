import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slice";
import projectsReducer from './SliceProjects';


const saveToLocalStorage = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

export const saveDataToLocalStorage = (notes, projects) => {
    saveToLocalStorage('notes', notes);
    saveToLocalStorage('projects', projects);
};


export const store = configureStore({
    reducer: {
        notes: notesReducer,
        projects: projectsReducer
    },
});


store.subscribe(() => {
    const state = store.getState();
    saveDataToLocalStorage(state.notes, state.projects);
});