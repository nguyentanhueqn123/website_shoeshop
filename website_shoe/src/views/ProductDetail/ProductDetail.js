import React, { useState } from 'react'
import Price from '../../components/Price/Price'
import classnames from 'classnames'
import Star from '../../components/Star/Star'
// import Comment from '../../components/Comment'
import ProductCardV2 from '../../components/Card/ProductCardV2';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFetchProduct, useProduct, useFetchProducts, useProducts } from '../../store/product/hook'
import { useParams } from 'react-router-dom'
import { addToCart } from './../../utils/addtoCart';
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/user'
import { setCart } from '../../store/product'
import { showToastError } from '../../components/CustomToast/CustomToast'
export default function ProductDetail() {

  useFetchProduct()
  useFetchProducts()
  const product = useProduct()
  const products = useProducts()
  const [tab, setTab] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  
  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))

  const handleChangeTab = (tab) => {
    setTab(tab)
  }


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 16,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 16,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 16,
    }
  };

  return (

    <div className="w-full bg-white">
      <div className="max-w-screen-xl w-full mx-auto py-5">
        <div className="flex">
          <div className="w-3/5 grid grid-cols-2 gap-2">
            {
              product?.data?.image?.map((image, index) => {
                return (
                  <img key={index} className="max-w-full" src={image} alt="product-detail" />
                )
              })
            }
          </div>

          <div className="w-2/5 pl-5 text-center">
            <p className="text-black font-medium text-2xl opacity-80 mb-3 text-center">
              {product?.data?.nameProduct}
            </p>
            <div className="mb-5 flex items-center justify-center">
              <Star
                numberStar={product?.star}
                size="xl"
                className="px-2"
              />
              <a href="#product-review" className="px-2 border-l border-gray-300 underline">
                Xem {product?.comment?.data?.length || 0} đánh giá
              </a>
            </div>
            <Price
              price={product?.data?.priceSale}
              priceDel={product?.data?.price}
              color="black"
              className="text-lg mb-5 text-center"
            />

            <a href="#des-detail" className="text-primary underline">
              Mô tả & Chi tiết
            </a>

            <div className="flex items-center w-full mt-5 pb-10 border-b border-gray-300">
              <button
                onClick={async () => {
                  if(userLogin?._id) {
                    await addToCart(userLogin?._id, id)
                    await dispatch(fetchUser(userLogin?._id))
                  } else {
                    showToastError("Bạn cần đăng nhập vào hệ thống")
                  }
                }}
                className="bg-black text-white font-medium text-lg py-4 px-5 hover:opacity-80 w-full uppercase">
                Thêm vào giỏ hàng
              </button>
            </div>

            <div className="py-5 pl-3">
              <div className="flex items-center py-1">
                <i className='bx bxs-truck text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  Miễn phí giao hàng
                </p>
              </div>
              <div className="flex items-center py-1">
                <i class='bx bx-revision text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  Đổi trả trong 60 ngày
                </p>
              </div>
              <div className="flex items-center py-1">
                <i className='bx bx-check-shield text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  Bảo hành 2 năm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-2 p-10 mt-20" id="des-detail" >
          <div className="flex items-center mb-4">
            <div
              className={classnames("uppercase text-black mr-4 px-2 pb-1 cursor-pointer", { "border-b-4 border-primary": tab === 1 })}
              onClick={() => handleChangeTab(1)}
            >
              Mô tả
            </div>
            <div
              className={classnames("uppercase text-black px-2 pb-1 cursor-pointer", { "border-b-4 border-primary": tab === 2 })}
              onClick={() => handleChangeTab(2)}
            >
              Chi tiết
            </div>

          </div>

          {
            tab === 1 && (
              <div>
                <p className="opacity-70">
                  {
                    product?.data?.description
                  }
                </p>
              </div>
            )
          }
          {
            tab === 2 && (
              <div className="px-2 opacity-80">
                {
                  product?.data?.metal && (
                    <>
                      <div className="flex items-start mb-3">
                        <p className="text-black font-bold">
                          METAL
                        </p>
                        <p className="ml-2">
                          {product?.data?.metal}
                        </p>
                      </div>
                    </>
                  )
                }

                {
                  product?.data?.size && (
                    <>
                      <div>
                        <p className="text-black font-bold mb-1">
                          SIZE
                        </p>
                        <p>
                          {product?.data?.size}
                        </p>
                      </div>
                    </>
                  )
                }
              </div>
            )
          }
        </div>

        {
          products && (
            <>
              <p className="text-black font-medium text-2xl py-5 my-10 border-b border-gray-300">Gợi ý cho bạn</p>
              <div className="mr-[-8px] ml-[-8px]">
                <Carousel
                  swipeable
                  autoPlay
                  autoPlaySpeed={2000}
                  draggable={true}
                  showDots={false}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  keyBoardControl={true}
                  // removeArrowOnDeviceType={["tablet", "mobile"]}
                  minimumTouchDrag={80}
                  slidesToSlide={1}
                  itemClass="top-product-carousel-items"
                  containerClass="top-product-carousel-container"
                  partialVisible
                >

                  {
                    products?.data?.map((product, index) => {
                      if (index % 5 === 0) {
                        return
                      }
                      return (
                        <ProductCardV2 product={product} key={product?._id} />
                      )
                    })
                  }

                </Carousel>
              </div>
            </>
          )
        }

        {
          products && (
            <>
              <p className="text-black font-medium text-2xl py-5 my-10 border-b border-gray-300">Xem gần đây</p>
              <div className="mr-[-8px] ml-[-8px]">
                <Carousel
                  swipeable
                  autoPlay
                  autoPlaySpeed={2000}
                  draggable={true}
                  showDots={false}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  keyBoardControl={true}
                  // removeArrowOnDeviceType={["tablet", "mobile"]}
                  minimumTouchDrag={80}
                  slidesToSlide={1}
                  itemClass="top-product-carousel-items"
                  containerClass="top-product-carousel-container"
                  partialVisible
                >

                  {
                    products?.data?.map((product, index) => {
                      return (
                        <ProductCardV2 product={product} />
                      )
                    })
                  }

                </Carousel>
              </div>
            </>

          )
        }
        {/* <Comment comment={product?.comment?.data} question={product?.question?.data} productId={id} /> */}

        <div className="w-full border-t border-gray-300 py-10">
          <p className="font-medium text-lg text-center mb-5">
            - AS SEEN IN -
          </p>
          <div className="w-full flex items-center justify-center" >
            <div className="px-20">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878527/brand-story/Elle.svg" alt="icon" />
            </div>
            <div className="px-20">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878532/brand-story/Business_Insider.svg" alt="icon" />
            </div>
            <div className="px-20">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572885812/brand-story/fast-company.svg" alt="icon" />
            </div>
            <div className="px-20">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878522/brand-story/WWD.svg" alt="icon" />
            </div>
            <div className="px-20">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878529/brand-story/Coveteur.svg" alt="icon" />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
