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
            const { id, title, description, tag, time, emote } = action.payload;
            const noteToUpdate = state.find(note => note.id === id);
            if (noteToUpdate) {
                noteToUpdate.title = title;
                noteToUpdate.description = description;
                noteToUpdate.tag = tag;
                noteToUpdate.time = time;
                noteToUpdate.emote = emote;
            }
        }
    }
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;