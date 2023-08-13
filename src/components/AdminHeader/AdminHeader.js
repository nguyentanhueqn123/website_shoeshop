import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import AdminSideBar from "../AdminSidebar/AdminSidebar"
export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full relative">
      <div className="navbar z-30 left-0 md:left-[231px] flex flex-row justify-between px-3 md:px-7">
        <div className="navbar__left" onClick={()=>{setOpen(!open)}}>
            <i className={open ? 'bx bx-x' : 'bx bx-menu'}></i>
        </div>
        <div className="navbar__right">
            <Link
              to={{
                pathname: "/admin/editProfile",
              }}
            >
                <div className="navbar__right-item">
                <img className="md:mr-2" src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg" alt="" />
                <span className="hidden md:block">Admin</span>
                </div>
            </Link>
        </div>
        {/* <AdminSideBar className="hidden"></AdminSideBar> */}
      </div>
      <div className={`w-full transition-all duration-500 ease-in absolute ${ open ? "top-0": "top-[-800px]"}`}>
        <AdminSideBar/>
      </div>

    </div>
  )
}
