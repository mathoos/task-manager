import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./utilities/Store";


import { loadProjectsFromLocalStorage } from "./utilities/Thunks";

import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(loadProjectsFromLocalStorage());


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
