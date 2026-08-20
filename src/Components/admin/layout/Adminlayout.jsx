import { Outlet } from "react-router-dom"
import Adminheader from "./Adminheader"
import Adminfooter from "./Adminfooter"
export default function Adminlayout(){
    return( 
    <>
    <Adminheader></Adminheader>
    <Outlet></Outlet>
    <Adminfooter></Adminfooter>
    </>
    )
}