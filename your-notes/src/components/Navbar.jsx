import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    
        <div className=" bg-neutral-950 flex border-[1.5px] place-content-evenly border-[#646cff]  rounded-lg p-[8px] pr-10 pl-10 justify-between items-center sticky top-5"  >
            <div>
                logo
            </div>
            <div className="flex gap-10">
                <NavLink className={({ isActive}) => isActive ? "text-[#646cff] " : " text-white" } to="/">Home</NavLink>
                <NavLink className={({ isActive}) => isActive ? "text-[#646cff]" : " text-white"} to="/notes">Notes</NavLink>
            </div>
            <div>
                {/* {* * } */}
            </div>
        </div>
    
  )
}

export default Navbar