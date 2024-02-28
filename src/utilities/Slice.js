import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // Ne laissez que l'ajout de note
        addNote: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;