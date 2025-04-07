import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const { id, title } = action.payload;
            state.push({ id, title, notes: [] });
        },
        deleteProject: (state, action) => {
            const projectIdToDelete = action.payload;
            return state.filter(project => project.id !== projectIdToDelete);
        },
        addNote: (state, action) => {
            const { projectId, note } = action.payload;
            const project = state.find(project => project.id === projectId);
            if (project) {
                project.notes.push({ ...note, projectId });
            }
        },
        deleteNote: (state, action) => {
            const { projectId, noteId } = action.payload;
            const project = state.find(project => project.id === projectId);
            if (project) {
                project.notes = project.notes.filter(note => note.id !== noteId);
            }
        },
        duplicateNote: (state, action) => {
            const { projectId, noteId } = action.payload;
            const project = state.find((project) => project.id === projectId);
            if (project) {
                const noteToDuplicate = project.notes.find((note) => note.id === noteId);
                if (noteToDuplicate) {
                    const duplicateNote = { ...noteToDuplicate, id: Date.now() };
                    project.notes.push(duplicateNote);
                }
            }
        },
        editNote: (state, action) => {
            const { projectId, noteId, newContent } = action.payload;
            const project = state.find(proj => proj.id === projectId);
            if (project) {
                const noteIndex = project.notes.findIndex(note => note.id === noteId);
                if (noteIndex >= 0) {
                    project.notes[noteIndex] = { ...project.notes[noteIndex], ...newContent };
                }
            }
        },
        moveNote: (state, action) => {
            const { projectId, noteId, newContainer } = action.payload;
            const project = state.find(project => project.id === projectId);
            if (project) {
                const note = project.notes.find(note => note.id === noteId);
                if (note) {
                    note.container = newContainer; 
                }
            }
        },
        toggleNoteCompletion: (state, action) => {
            const { projectId, noteId } = action.payload;
            const project = state.find(project => project.id === projectId);
            if (project) {
                const note = project.notes.find(note => note.id === noteId);
                if (note) {
                    note.isCompleted = !note.isCompleted;
                }
            }
        }
    },
});

export const { addProject, deleteProject, addNote, deleteNote, duplicateNote, editNote , moveNote, toggleNoteCompletion } = projectSlice.actions;
export default projectSlice.reducer;