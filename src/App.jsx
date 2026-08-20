import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/user/layout/Layout";
import Home from "./Components/user/layout/pages/Home";
import About from "./Components/user/layout/pages/About";
import Services from "./Components/user/layout/pages/Services";
import Program from "./Components/user/layout/pages/Program";
import Events from "./Components/user/layout/pages/Events";
import Contact from "./Components/user/layout/pages/Contact";
import Adminlayout from "./Components/admin/layout/Adminlayout";
import Dashboard from "./Components/admin/pages/Dashboard";
import Manageincident from "./Components/user/incident/Manageincident";
import Addincident from "./Components/user/incident/Addincident";
import Mincident from "./Components/admin/incident/Mincident";
import Managecategory from "./Components/admin/category/Managecategory";
import Addcategory from "./Components/admin/category/Addcategory";



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/service' element={<Services />} />
            <Route path='/program' element={<Program />} />
            <Route path='/event' element={<Events />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/incident" element={<Manageincident />} />
            <Route path="/incident/add" element={<Addincident />} />
          </Route>



          {/* ADMIN */}
          <Route path='/admin' element={<Adminlayout />} >
            <Route path="" element={<Dashboard />} />
            <Route path="incident" element={<Mincident />} />
            <Route path="category" element={<Managecategory />} />
            <Route path="category/add" element={<Addcategory />} /> 
            



          </Route>






        </Routes >
      </BrowserRouter >
    </>
  )
}