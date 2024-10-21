import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast";

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []
    },
    reducers: {
        addToNotes: (state, action) => {
            const notes = action.payload;
            state.notes.push(notes)
            localStorage.setItem("notes",JSON.stringify(state.notes));
            toast.success("Notes created Successfully",{
                position: "bottom-center"
            })
        },
        
        updateToNotes: (state, action) => {
            const value = action.payload;
            console.log("note : ", value);

            const index = state.notes.findIndex((item)=> //It will give exits notes index
                item._id === value._id
            )
        
            console.log("Index : ",index);
            if(index >= 0){
                state.notes[index] = value
                localStorage.setItem("notes", JSON.stringify(state.notes))
                toast.success("Notes Updated",{
                    position: "bottom-center"
                });
            }

        },

        resetAllNotes: (state) => {
            state.notes = []
            localStorage.removeItem("notes")
        },

        removeFromNotes: (state, action) => {
            const value = action.payload;
            console.log("note : ", value);
            
            const index = state.notes.findIndex((item) => item._id === value._id);
            console.log("Index : ",index);

            if(index >= 0){
                state.notes.splice(index, 1)
                localStorage.setItem("notes", JSON.stringify(state.notes))
                toast.success("Note Deleted",{
                    position: "bottom-center"
                });
            }
        }

    }
})

export const { addToNotes,updateToNotes,resetAllNotes,removeFromNotes } = noteSlice.actions
export default noteSlice.reducer

