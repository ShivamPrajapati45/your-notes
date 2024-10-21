import {configureStore} from "@reduxjs/toolkit"
import noteReducer from "../slice/noteSlice.js"

export const store = configureStore({
    reducer: {
        notes: noteReducer,
    }
})