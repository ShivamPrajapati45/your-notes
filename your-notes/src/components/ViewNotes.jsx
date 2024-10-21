import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Viewnotes = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.notes.notes);
  const note = allNotes.filter((e) => e._id === id)[0];
  console.log("notes : ", note);

  const handleCopy = (note) => {
      navigator.clipboard.writeText(note?.content)
      toast.success("Text Copied",{
        position: "bottom-center"
      })
  }
  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="flex justify-center gap-16 ">
        <input
          value={note?.title}
          type="text"
          disabled
          placeholder="Enter Title..."
          className="outline-none p-3 rounded-lg w-[40rem] text-xl font-mono cursor-not-allowed"
        />
        <span className=" transition-all border p-3 ml-5 rounded-lg bg-[#646cff] border-blue-500 hover:bg-[#454ef7]">
          <Link to="/">
            <i className="fa-solid fa-plus"></i>
          </Link>
        </span>{" "}
      </div>
      <div className="flex justify-center items-center flex-col relative">
        <div className="flex justify-end  w-1/2">
            <i
                onClick={() => handleCopy(note)}
                className="opacity-50 text-2xl fa-regular fa-copy absolute mr-[-80px] hover:opacity-90 transition-all" 
            ></i>
        </div>
        <textarea
          value={note?.content}
          disabled
          placeholder="write your notes here freely..."
          className="outline-none cursor-not-allowed rounded-md min-w-[830px] p-3 font-mono"
          rows={18}
        ></textarea>
      </div>
    </div>
  );
};

export default Viewnotes;
