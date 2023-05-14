import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
export default function AdminHeader() {
  return (
    <div className="navbar">
        <div className="navbar__left">
            <i className="bx bx-menu"></i>
            <p></p>
        </div>
        <div className="navbar__right">
            <Link
              to={{
                pathname: "/admin/editProfile",
              }}
            >
                <div className="navbar__right-item">
                <img src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg" alt="" />
                <span>Admin</span>
                </div>
            </Link>
        </div>
    </div>
  )
}
