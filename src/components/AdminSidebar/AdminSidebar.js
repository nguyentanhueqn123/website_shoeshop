import React, {useState} from 'react'
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
    const [open, setOpen] = useState(false);

    return (
        <div className="sidebar md:top-0 md:left-0 bg-[#eee] md:bg-white h-auto md:h-full w-full md:w-[230px] mt-[70px] md:mt-0 overflow-hidden fixed z-20">
            <Link to="/">
                <img className="hidden md:block image-logo bg-cover bg-center bg-[url('/public/images/home/logo1.png')]" style={{ width: "150px", height: "150px", marginLeft: "40px" }} alt="" />
            </Link>
            <ul className="py-4 md:py-10">
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
