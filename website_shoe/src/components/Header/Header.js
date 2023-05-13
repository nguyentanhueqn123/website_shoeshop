import React, { useState, useEffect } from 'react'
import { FiMail, FiClock, FiPhone, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import Container from '../Container/Container';
import { NavLink, Link } from 'react-router-dom';
import '../../styles/header.scss';
import { fetchUser } from './../../store/user/index'
import { fetchProduct, setTotalPriceRedux } from './../../store/product/index'
import { useUser } from './../../store/user/hook'
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
    navigate('/login')
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
      displayName: 'Trang chủ',
      link: ''
    },
    {
      displayName: 'Danh mục',
      link: 'danh-muc'
    },
  ]



  return (
    <div>
      <div className="w-full bg-green-3">
        <div className="flex items-center justify-between py-2 mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <div className="flex items-center text-black-1 px-2 border-r border-gray-600 text-sm-md font-medium">
              <FiMail className="mr-2" />
              <span className="uppercase">
                Contact
              </span>
            </div>
            <div className="flex items-center text-black-1 px-2 border-r border-gray-600 text-sm-md font-medium">
              <FiClock className="mr-2" />
              <span className="uppercase">
                08:00 - 23:00
              </span>
            </div>
            <div className="flex items-center text-black-1 px-2 border-r border-gray-600 text-sm-md font-medium">
              <FiPhone className="mr-2" />
              <span className="uppercase">
                0797 509 992
              </span>
            </div>
          </div>

          {
            userLogin ? (
              <button
                
                className="flex items-center text-black-1"
              >
                <span onClick={handleAdmin} className="mr-2">
                  {
                    userLogin?.nameAccount
                  }
                </span>
                <FiLogOut onClick={handleLogout} width={15} />
              </button>
            ) : (
              <Link to="/login" className="text-white text-2xl cursor-pointer">
                <FiUser />
              </Link>
            )
          }
        </div>
      </div>
      <div className="w-full bg-green-4">
        <Container className="justify-between items-center py-5">
          <Link to="/">
            <img src="/logo1.png" alt="logo" className="image-logo" />
          </Link>
          <ul className="flex items-center">
            {
              menu.map((item, index) => {
                return (
                  <li className="mr-4 text-md text-black-1 font-medium uppercase" key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive ? "rounded px-3 py-2 text-black-2 border border-dashed border-black-2" : "transition-all duration-100 ease-linear rounded hover:px-3 hover:py-2 hover:text-black-2 hover:border hover:border-dashed hover:border-black-2"
                      }
                    >
                      {item.displayName}
                    </NavLink>
                  </li>
                )
              })
            }

            <Link to="/gio-hang">
              <div className="group relative cart-item text-black-2 cursor-pointer flex items-center transition-all duration-100 ease-linear rounded hover:p-3 hover:text-black-2 hover:border hover:border-dashed hover:border-black-2">
                <span className=" text-md font-medium mr-3">
                  {totalPrice || 0} <span className="underline">đ</span>
                </span>
                <div className="text-md font-medium w-[30px] h-[30px] relative border-2 border-black-2 flex items-center justify-center cart-icon-header text-white">
                  {cart?.length || 0}
                </div>
                <div className="group-hover:flex absolute bg-white top-full border px-3 hidden border-gray-300 min-w-[260px] -right-[20px] min-h-[100px] z-10">
                  {
                    !cart?.length ? (
                      <div className="text-[#777] flex items-center justify-center">
                        Chưa có sản phẩm trong giỏ hàng
                      </div>
                    ) : (
                      <div>
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

                        <div className="text-center">
                          <a href="/gio-hang" className="py-1 underline text-lg">
                            Xem tất cả
                          </a>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </Link>
          </ul>
        </Container>
      </div>
    </div>
  )
}
