import { NavLink, Outlet } from "react-router-dom";

import { RiUserShared2Fill } from "react-icons/ri";

import { MdDesignServices } from "react-icons/md";

import { RiContactsFill } from "react-icons/ri";


//import { MdSettingsApplications } from "react-icons/md";

import "./AdminLayout.css";

export const Adminlayout = ()=>{
    return (
        <>
        <header>
            <div className="containerss">
                <nav>
                <div className="Logo-symbol">
            <NavLink to="/admin">ADMIN-PANEL:</NavLink>
          </div>
                    <ul>
                        <li><NavLink to="/admin/contacts"><RiUserShared2Fill />users</NavLink></li>
                        <li><NavLink to="/admin/users"><RiContactsFill />contact</NavLink></li>
                        <li><NavLink to="/post"><MdDesignServices />post-arts</NavLink></li>

                        
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
        </>
    )
};