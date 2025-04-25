import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../../slice/noteSlice";
import toast from "react-hot-toast";

const Notes = () => {
  const notes = useSelector((state) => state.notes.notes);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const filterData = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filterData);

  const handleDelete = (noteId) => {
    dispatch(removeFromNotes(noteId));
    console.log(noteId);
  };

  const handleCopy = (note) => {
    navigator.clipboard.writeText(note?.content);
    toast.success("copied to clipboard",{
      position: "bottom-center"
    });
  };

  return (
    <div className="mt-5 ">
      <div className="sticky top-[5rem]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search your notes..."
          className="rounded-md w-1/2 p-3 outline-none font-mono"
        />
        <span className=" transition-all border p-3 ml-5 rounded-lg bg-[#646cff] border-blue-500 hover:bg-[#454ef7]">
          <Link to="/">
            <i className="fa-solid fa-plus"></i>
          </Link>
        </span>
      </div>

      <div className="mt-7 flex gap-4 flex-col justify-center items-center">
        {filterData.length > 0 &&
          filterData.map((note, index) => {
            console.log("Index : ", index);
            return (
              <div
                key={index}
                className="flex flex-col w-[45rem] h-[8rem] min-h-[8rem] border rounded-lg bg-black"
              >
                <div className="flex p-3 justify-between w-full place-content-evenly min-h-[4rem]">
                  <div>
                    <span className="font-sans text-[2rem]">
                      Title: {note?.title}
                    </span>
                  </div>
                  <div className="">
                    <div className="flex gap-3">
                      <i
                        onClick={() => handleDelete(note)}
                        className="icon fa-regular fa-trash-can"
                      ></i>
                      <Link to={`/?noteId=${note?._id}`}>
                        <i className="icon fa-regular fa-pen-to-square"></i>
                      </Link>
                      <i className="icon fa-solid fa-arrow-up-from-bracket"></i>
                      <i
                        onClick={() => handleCopy(note)}
                        className="icon fa-regular fa-copy"
                      ></i>
                      <Link to={`/notes/${note?._id}`}>
                        <i className=" icon fa-solid fa-eye"></i>
                      </Link>
                    </div>
                    <div className="flex float-end font-sans font-bold">
                      <span>
                        <i className="fa-regular fa-calendar pt-5"></i>
                        {note?.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex ml-3 font-sans text-xl w-full min-h-[4rem]">
                  <span> {note?.content} </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
