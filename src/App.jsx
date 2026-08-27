import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/user/layout/Layout";
import Home from "./Components/user/layout/pages/Home";
import About from "./Components/user/layout/pages/About";
import Services from "./Components/user/layout/pages/Services";
import Program from "./Components/user/layout/pages/Program";
import Events from "./Components/user/layout/pages/Events";
import Contact from "./Components/user/layout/pages/Contact";
import Login from "./Components/user/layout/pages/Login";
import Register from "./Components/user/layout/pages/Register";
import Manageincident from "./Components/user/incident/Manageincident";
import Addincident from "./Components/user/incident/Addincident";

import Adminlayout from "./Components/admin/layout/Adminlayout";
import Dashboard from "./Components/admin/pages/Dashboard";
import Mincident from "./Components/admin/incident/Mincident";
import Managecategory from "./Components/admin/category/Managecategory";
import Addcategory from "./Components/admin/category/Addcategory";
import Trustedcontacts from "./Components/user/layout/pages/Trustedcontacts";
import Addcontacts from "./Components/user/layout/pages/Addcontacts";
import ProtectedRoute from "./Components/ProtectedRoute";
import ManageUsers from "./Components/admin/users/ManageUsers";
import ManageSafetyTips from "./Components/admin/safety/ManageSafetyTips";
import ManageProfile from "./Components/user/profile/ManageProfile";
import SafetyTips from "./Components/user/safety/SafetyTips";
import EmergencyNumbers from "./Components/user/safety/EmergencyNumbers";
import MyReports from "./Components/user/incident/MyReports";

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<Services />} />
            <Route path="program" element={<Program />} />
            <Route path="event" element={<Events />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="tips" element={<SafetyTips/>} />
            <Route path="emergency" element={<EmergencyNumbers/>} />
            
            {/* USER PROTECTED ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={["2"]} />}>
              <Route path="incident" element={<Manageincident />} />
              <Route path="incident/add" element={<Addincident />} />
              <Route path="trustedcontacts" element={<Trustedcontacts/>} />
              <Route path="Addcontacts" element={<Addcontacts/>} />
              <Route path="profile" element={<ManageProfile/>} />
              <Route path="my-reports" element={<MyReports/>} />
            </Route>
          </Route>

          {/* ADMIN PROTECTED ROUTES */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["1"]} />}>
            <Route element={<Adminlayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="incident" element={<Mincident />} />
              <Route path="category" element={<Managecategory />} />
              <Route path="category/add" element={<Addcategory />} />
              <Route path="category/edit/:id" element={<Addcategory />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="tips" element={<ManageSafetyTips />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}