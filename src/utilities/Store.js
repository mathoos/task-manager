import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slice";


export const store = configureStore({
    reducer: {
        notes: notesReducer
    },
});