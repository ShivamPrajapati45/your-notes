import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../../slice/noteSlice";
import toast from "react-hot-toast";

const Home = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [value, setValue] = useState();
    const [param, setParam] = useSearchParams();
    const noteId = param.get("noteId");
    const allNotes = useSelector((state) => state?.notes?.notes);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };


    useEffect(() => {
        if(noteId){
            const note = allNotes.find((e) => e._id === noteId);
            console.log(note);
            setTitle(note?.title)
            setValue(note?.content)
        }
    },[noteId])

    const createNote = () => {
        const note = {
            title: title,
            content: value,
            _id: noteId ||  Date.now().toString(36),
            createdAt: new Date().toLocaleDateString('en-US', options),
        }

        if(noteId){
                dispatch(updateToNotes(note));
                setTitle('');
                setValue('');
                setParam({});
        }else{
            if(!note.title || !note.content){
                toast.error("write something to save note..",{
                    position: "bottom-center"
                })
            }else{
                dispatch(addToNotes(note));
                setTitle('');
                setValue('');
                setParam({});
            }
        }

        
    }

    const handleCopy = () => {
        if(value){
            navigator.clipboard.writeText(value);
            toast.success("Text Copied",{
            position: "bottom-center"
            })
        }else{
            toast.error("Write something...",{
                position: "bottom-center"
            })
        }
        
    }

    return (
    <div className="flex flex-col gap-5 mt-3">
        <div className="flex justify-center gap-16 ">
            <input 
                type="text" 
                value={title}
                onChange={(e) =>  setTitle(e.target.value)}
                placeholder="Enter Title..."
                className="outline-none p-3 rounded-lg w-[40rem] text-xl font-mono"
                />
            <button onClick={createNote}>{noteId ? "Update Note" : "Save Note"}</button>
        </div>
        <div className="flex justify-center items-center flex-col relative">
            <div className="flex justify-end  w-1/2">
            <i
                onClick={handleCopy}
                className="opacity-50 text-2xl fa-regular fa-copy absolute mr-[-80px] hover:opacity-90 transition-all" 
            ></i>
            </div>
            <textarea
                value={value}
                onChange={(e) =>  setValue(e.target.value)}
                placeholder="write your notes here freely..."
                className="outline-none rounded-md min-w-[830px] p-3 font-mono"
                rows={18} 
            ></textarea>
        </div>
    </div>
    )
}

export default Home