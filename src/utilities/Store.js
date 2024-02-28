import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slice";


// Fonction pour sauvegarder les notes dans le localStorage
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

// Abonnez-vous aux changements d'état du magasin pour mettre à jour le localStorage
store.subscribe(() => {
    const state = store.getState();
    saveNotesToLocalStorage(state.notes);
});