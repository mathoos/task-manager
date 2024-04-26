import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload); 
        },
        updateNote: (state, action) => {
            const { id, updatedNote } = action.payload;
            const noteIndex = state.findIndex(note => note.id === id);
            if (noteIndex !== -1) {
                state[noteIndex] = updatedNote;
            }
        }
    }
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;