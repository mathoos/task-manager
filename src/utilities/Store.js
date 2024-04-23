import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slice";


const saveNotesToLocalStorage = (notes) => {
    try {
        const serializedNotes = JSON.stringify(notes);
        localStorage.setItem('notes', serializedNotes);
    } catch (error) {
        console.error('Error saving notes to localStorage:', error);
    }
};


export const store = configureStore({
    reducer: {
        notes: notesReducer
    },
});


store.subscribe(() => {
    const state = store.getState();
    saveNotesToLocalStorage(state.notes);
});