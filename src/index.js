import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./utilities/Store";
import { addNote } from "./utilities/Slice";


import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const notesFromLocalStorage = localStorage.getItem('notes');
if (notesFromLocalStorage) {
    const parsedNotes = JSON.parse(notesFromLocalStorage);
    parsedNotes.forEach(note => {
        store.dispatch(addNote(note));
    });
}


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
