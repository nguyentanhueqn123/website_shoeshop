import React from 'react'
import { FiUsers, FiUser, FiGift, FiList, FiShoppingBag, FiGrid, FiCheckCircle, FiMessageCircle } from "react-icons/fi";

import { NavLink, Link } from 'react-router-dom'
import "./Sidebar.scss"
export default function AdminLeftMenu() {

    const leftMenu = [
        {
            icon: <h1 className='bx bx-home'/>,
            label: 'Dashboard',
            link: '/admin/dashboard',
        },
        {
            icon: <FiShoppingBag />,
            label: 'Products',
            link: '/admin/products',
        },
        {
            icon: <FiList />,
            label: 'Category',
            link: '/admin/category',
        },
        {
            icon: <FiUsers />,
            label: 'Customers',
            link: '/admin/customers',
        },
        {
            icon: <FiCheckCircle />,
            label: 'Orders',
            link: '/admin/orders',
        },
        {
            icon: <FiGift />,
            label: 'Coupons',
            link: '/admin/coupons',
        },
        {
            icon: <FiUser />,
            label: 'Our Staff',
            link: '/admin/our-staff',
        },
        // {
        //     icon: <FiMessageCircle />,
        //     label: 'News',
        //     link: '/admin/news',
        // },
    ]

    return (
        <div className="sidebar h-full w-[230px] overflow-hidden fixed">
            <Link to="/">
                <img className="image-logo bg-cover bg-center bg-[url('/public/images/home/logo1.png')]" style={{ width: "150px", height: "150px", marginLeft: "40px" }} alt="" />
            </Link>
            <ul className="py-10">
                {
                    leftMenu.map((item, index) => {
                        return (
                            <li className="" key={index}>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "sidebar__item-inner" : "sidebar__item-inner_hover"
                                }
                                    to={item.link}
                                >
                                    <div className="text-lg">
                                        {item.icon}
                                    </div>
                                    <span className="ml-3 font-mono">{item.label}</span>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
