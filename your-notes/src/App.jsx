import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Home, Navbar, Viewnotes, Notes } from "./components/index.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path: "/notes",
    element: <div>
      <Navbar/>
      <Notes/>
    </div>
  },
  {
    path: "/notes/:id",
    element : <div>
      <Navbar/>
      <Viewnotes/>
    </div>
  }
])


function App(){
  
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App