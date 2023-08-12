import React, { useState, useEffect } from 'react'
import { FiMail, FiClock, FiPhone, FiShoppingBag, FiUser, FiLogOut, FiSettings, FiShoppingCart } from "react-icons/fi";
import Container from '../Container/Container';
import { NavLink, Link } from 'react-router-dom';
import { Toast } from '../CustomToast/CustomToast';
import { showToastSuccess} from '../CustomToast/CustomToast';

import '../../styles/header.scss';
import { fetchUser } from '../../store/user/index'
import { fetchProduct, setTotalPriceRedux } from '../../store/product/index'
import { useUser } from '../../store/user/hook'
import { useDispatch } from 'react-redux'
import productApi from '../../api/productApi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/product/hook'
import { setCart } from '../../store/product/index'
import "./Header.scss"
export default function Header() {

  const navigate = useNavigate()
  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState()
  const user = useUser()
  const cart = useCart()
  
  const handleLogout = () => {
    
    localStorage.removeItem("USER_LOGIN")
    navigate('/')
    showToastSuccess("Log Out successful");

  }
  const handleAdmin = () => {
    navigate('/admin/dashboard')
  }

  useEffect(() => {
    if (userLogin) {
      try {
        dispatch(fetchUser(userLogin?._id))
      } catch (err) {
        console.log(err)
      }
    }

  }, [])
  // lỗi từ thèn này ra

  useEffect(() => {
    if (user) {
      const getListCart = async () => {
        const promise = user?.data?.cart.map(async (productId) => {
          const productDetail = await productApi.getProduct(productId)
          return productDetail
        })
        const res = await Promise.all(promise)
        dispatch(setCart(res))
      }
      getListCart()
    }
  }, [dispatch, user])


  useEffect(() => {
    const total = cart?.reduce((total, product) => total + product?.data?.priceSale, 0)
    setTotalPrice(total)
    dispatch(setTotalPriceRedux(total))
  }, [cart])


  const menu = [
    {
      displayName: 'Home',
      link: ''
    },
    {
      displayName: 'Product',
      link: 'danh-muc'
    },
    // {
    //   displayName: 'Blog',
    //   link: 'blog'
    // },
    {
      displayName: 'Contact',
      link: 'lien-he'
    },
  ]
  const [ open, setOpen] = useState(false);


  return (
    <div>
      <div className="w-full bg-[#62B4FF] z-20">
        <div className="flex items-center justify-between py-2 mx-3 md:mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <div className="flex items-center text-white px-2 border-r border-white text-sm-md font-medium">
              <FiMail className="mr-2" />
              <span>
                4HShoe@gmail.com
              </span>
            </div>
            <div className="flex items-center text-white px-2 border-r border-white text-sm-md font-medium">
              <FiPhone className="mr-2" />
              <span className="uppercase">
                0962256789
              </span>
            </div>
          </div>

          {
            userLogin ? (
              <button
                className="flex flex-col relative items-center text-white"
              >
                {/* <span onClick={handleAdmin} className="mr-2"> */}
                <div className="md:mr-2 flex flex-row items-center" onClick={()=>{setOpen(!open)}}>
                  <FiUser className="text-[24px] mr-1" />
                  <span className="hidden md:block">
                    {
                      userLogin?.nameAccount
                    }
                  </span>
                  
                </div>
                
                <ul className={`dropdown-menu md:right-1.5 text-left text-black shadow-md border absolute ${open ? 'active' : 'inactive'}`}>
                  <Link to="/gio-hang" onClick={()=>{setOpen(!open)}} className={`flex items-center li-option ${open ? 'active' : 'inactive'}`}>
                    <FiShoppingCart width={15} className="mx-3"/>
                    <li>My Cart</li>
                  </Link>
                  <Link to="/order" onClick={()=>{setOpen(!open)}} className={`flex items-center li-option ${open ? 'active' : 'inactive'}`}>
                    <FiShoppingBag width={15} className="mx-3"/>
                    <li>My Order</li>
                  </Link>
                  <Link to="/setting" onClick={()=>{setOpen(!open)}} className={`flex items-center li-option ${open ? 'active' : 'inactive'}`}>
                    <FiSettings width={15} className="mx-3"/>
                    <li>Setting</li>
                  </Link>
                  <Link to="/" onClick={handleLogout} className="flex items-center li-option">
                    <FiLogOut width={15} className="mx-3"/>
                    <li>Log out</li>
                  </Link>
                </ul>
                
                {/* <FiLogOut onClick={handleLogout} width={15} /> */}
              </button>
            ) : (
              
              <Link to="/login" className="text-white cursor-pointer flex items-center justify-center text-[24px]">
                <FiUser className="hidden md:block" />
                <p className="text-[13px] ml-2 py-1 px-4 bg-[#fff] rounded-lg text-[#62B4FF] hover:bg-[#eee]">LOG IN</p>
                
              </Link>
            )
          }
        </div>
      </div>
      <div className="w-full bg-white shadow-md mb-3 z-20">
        <Container className="flex justify-between items-center py-5">
          <Link to="/">
            <img src="/logo1.png" alt="logo" className="image-logo1 hidden md:block" />
          </Link>
          
          <ul className="flex items-center ml-5">
            {
              menu.map((item, index) => {
                return (
                  <li className="mr-4 text-md text-black-1 font-medium uppercase tracking-widest" key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive ? "rounded px-3 py-2 text-[#62B4FF] font-bold" : "transition-all duration-100 ease-linear rounded hover:p-3 hover:text-black-2 hover:bg-[#ccc] hover:rounded-lg hover:text-white"
                      }
                    >
                      {item.displayName}
                    </NavLink>
                  </li>
                )
              })
            }

            
          </ul>
          <div>
              <div className="group relative cart-item text-black-2 cursor-pointer flex items-center transition-all duration-100 ease-linear rounded hover:p-3 hover:bg-[#ccc] hover:rounded-lg">
                <span className="hidden md:block text-md font-medium mr-3">
                  {totalPrice || 0} <span className="underline">đ</span>
                </span>

                <i className="fa-solid mr-2 md:mr-0 fa-cart-shopping text-black text-[1.5rem]"></i>
                
                <div className="rounded-full bg-red-400 w-[20px] h-[20px] text-white flex items-center justify-center mt-[-24px] mr-2 md:mr-0 ml-[-20px] md:ml-[-10px]">
                  {cart?.length || 0}
                </div>
                    
                <div className="group-hover:flex absolute rounded-lg shadow-md bg-white top-full border px-3 hidden border-gray-300 w-screen md:w-[430px] right-[0px] overflow-hidden min-h-[200px] z-10">
                  {
                    !cart?.length ? (
                      <div className="text-[#777] flex flex-col w-full h-[260px] items-center justify-center">
                        <img className="flex w-[80px] h-[80px]" src="/images/icon/bags.png" alt="" />
                        <p className="flex items-center justify-center mt-4">No Product !</p>  
                      </div>
                    ) : (
                      <div className="w-full">
                        {
                          cart.map((product, index) => {
                            if (index >= 5) {
                              return
                            }
                            return (
                              <a href={`/san-pham/${product?.data?._id}`} key={index} >
                                <div className="flex items-center p-2">
                                  <img src={product?.data?.image?.[0]} alt="product" width={50} />
                                  <p className="text-black text-md ml-3">
                                    {product?.data?.nameProduct}
                                  </p>
            
                                </div>
                              </a>
                            )
                          })
                        }

                        <div className="w-full flex justify-between items-center my-3">
                          <p className="text-[14px] md:mr-2">{cart?.length || 0} Products Add to Cart</p>
                          <a href="/gio-hang" className="text-[14px] px-5 py-2 rounded-lg bg-[#62B4FF] hover:bg-[#349eff] text-white">
                            View Cart
                          </a>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
