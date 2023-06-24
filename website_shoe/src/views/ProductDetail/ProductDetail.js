import React, { useState } from 'react'
import Price from '../../components/Price/Price'
import classnames from 'classnames'
import Star from '../../components/Star/Star'
import Comment from '../../components/Comment'
import ProductCardV2 from '../../components/Card/ProductCardV2';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFetchProduct, useProduct, useFetchProducts, useProducts } from '../../store/product/hook'
import { Link, useParams } from 'react-router-dom'
import { addToCart } from './../../utils/addtoCart';
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/user'
import { setCart } from '../../store/product'
import { showToastError } from '../../components/CustomToast/CustomToast'
import Dropdown from '../../components/Dropdown/Dropdown'
import { SIZE } from '../../constants/index'
import { useFetchListInvoice, useListInvoice } from '../../store/invoice/hook'



export default function ProductDetail() {
  const listInvoice = useListInvoice()
  useFetchListInvoice()
  // console.log("===== list Invoice:", listInvoice?.data);

  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))

  useFetchProduct()
  useFetchProducts()
  const product = useProduct()
  const products = useProducts()
  const [tab, setTab] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  

  const handleChangeTab = (tab) => {
    setTab(tab)
  }


  const deliveredInvoices = listInvoice?.data?.filter(invoice => invoice.status === 'DELIVERED'&& invoice.userId === userLogin?._id)
  console.log("List Order Delivered: ",deliveredInvoices);
  // console.log(product?.data?._id)
  // deliveredInvoices?.forEach((invoice, index) => {
  //   console.log("đơn hàng thứ :", index+1)
  //   invoice.product?.map((productId , index1)=> {
  //     console.log("id: ",productId, ", SP thứ: ", index1+1);
  //     if (product?.data?._id === productId) {
  //       console.log("có thể review ^^");
  //     }else{
  //       console.log("ko thể review được!");

  //     }
  //   });
  // });
  



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


  /////
  const [inputValue, setInputValue] = useState(1)
  // const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
  // const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleIncrease = async (e) => {
      e.preventDefault()
      setInputValue(inputValue + 1)
      try {
          // await userApi.addCart(userLogin?._id, product?.data?._id)
          dispatch(fetchUser(userLogin?._id))
      } catch (err) {
          console.log(err)
      }
  }
  const handleDecrease = async (e) => {
      e.preventDefault()
      if (inputValue === 1) {
          return
      }
      setInputValue(inputValue - 1)

      try {
          // await userApi.deleteCart(userLogin?._id, product?.data?._id)
          dispatch(fetchUser(userLogin?._id))
      } catch (err) {
          console.log(err)
      }
  }
  ////
  const updateFieldSearch = (field, value) => {
    // dispatch(updateSearchData({ [field]: value }))
  }

  // console.log("===> Comment: ", product?.comment?.data)
  // show quality rating
  // console.log(product?.comment?.data.map(comment => comment.star))
  const commentData = product?.comment?.data;
  let starAvg = 0;
  if (commentData && commentData.length > 0) {
    const starSum = commentData.reduce((acc, comment) => acc + comment.star, 0);
    starAvg = starSum / commentData.length;
  }
  // console.log(starAvg.toFixed(1));

  return (

    <div className="w-full bg-white mt-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between">
          {/* display path on Product */}
          <div className="flex items-center text-xl" id="top">
            <Link to="/" className="opacity-50 hover:opacity-100">HOME</Link>
            <span className="mx-3">/</span>
            <Link to="/danh-muc" className="opacity-50 hover:opacity-100">PRODUCTS</Link>
            <span className="mx-3">/</span>
            <p className="font-medium text-[#62B4FF]">
              {product?.data?.nameProduct}
            </p>
          </div>
        </div>

        <div className="flex mt-6 p-6 border rounded-lg">
          <div className="w-2/5">
            {
              <img src={product?.data?.image?.[0]} alt="product" className="w-full h-full object-cover" />
            }
          </div>

          <div className="w-3/5 ml-10">
            <p className="text-black font-medium text-2xl opacity-80 mb-3">
              {product?.data?.nameProduct}
            </p>
            <div className="mb-5 flex">
            <div className="flex justify-center items-center text-[#EF4444]">
                <span className="mr-1">
                {
                  starAvg.toFixed(1)
                }
                </span>
              </div>
              <Star
                numberStar={starAvg}
                size="xl"
              />
              <a href="#product-review" className="ml-2 px-2 border-l border-gray-300">
                View {product?.comment?.data?.length || 0} comment
              </a>
            </div>
            <div className="flex items-center">
              <Price
                price={product?.data?.priceSale}
                priceDel={product?.data?.price}
                color="black"
                className="text-[2rem]"
              />
              <span className=" rounded-lg text-[14px] px-2 ml-[56px] bg-[#62B4FF] text-white">{product?.data?.sale}% decrease</span>
            </div>
            <div className="container-box w-full flex my-4">
              <div className="flex w-[108px] bg-[#f9f9f9] rounded-l-lg items-center justify-between">
                <span className="pl-3">Size</span>
                <div className="">
                  <Dropdown
                      title="42"
                      listDropdown={Object.values(SIZE)}
                      label="label"
                      onSelect={(status) => {
                        updateFieldSearch('status', status)
                      }}
                  />
                </div>
              </div>
              <div className="flex w-4/5 items-center ml-5">
                <p className="mr-3">Quantity:</p>
                <form className="flex items-center">
                  <button className="bg-[#f9f9f9] px-4 py-2 border border-gray-300 rounded-l-lg"
                      onClick={e => handleDecrease(e)}
                  >
                    -
                  </button>
                  <input value={inputValue} className="w-8 py-2 text-center border border-gray-300" onChange={handleInputChange} />
                  <button
                    className="bg-[#f9f9f9] px-4 py-2 border border-gray-300 rounded-r-lg"
                    onClick={(e) => handleIncrease(e)}
                  >
                    +
                  </button>
                </form>
              </div>
            </div>

            <a href="#des-detail" className="text-gray-500 hover:text-[#62B4FF] underline">
              Description and Details
            </a>

            <div className="flex items-center w-full mt-5 pb-10 border-b border-gray-300">
              <button
                onClick={async () => {
                  if(userLogin?._id) {
                    await addToCart(userLogin?._id, id)
                    await dispatch(fetchUser(userLogin?._id))
                  } else {
                    showToastError("You need to Login")
                  }
                }}
                className=" text-white font-medium text-lg py-3 px-6 rounded-lg hover:opacity-80 uppercase bg-[#62B4FF] hover:bg-[#62B4FF]">
                <i className="fa-solid fa-cart-shopping text-white mr-2"></i>
                Add to Cart
              </button>
              
            </div>

            <div className="py-5 pl-3">
              <div className="flex items-center py-1">
                <i className='bx bxs-truck text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  Free Shipping
                </p>
              </div>
              <div className="flex items-center py-1">
                <i className='bx bx-revision text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  7 Days Free Return
                </p>
              </div>
              <div className="flex items-center py-1">
                <i className='bx bx-check-shield text-2xl opacity-80'></i>
                <p className="opacity-80 text-sm-md ml-5">
                  2 Years Warranty
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-20" id="des-detail" >
          <div className="flex items-center mb-4 border-t-4 border-[#F7F8F9]">
            <div
              className={classnames("uppercase mr-4 px-12 py-5 cursor-pointer", { "border-b-4 border-[#62B4FF] text-[#62B4FF]": tab === 1 })}
              onClick={() => handleChangeTab(1)}
            >
              Description
            </div>
            <div
              className={classnames("uppercase px-12 py-5 cursor-pointer", { "border-b-4 border-[#62B4FF] text-[#62B4FF]": tab === 2 })}
              onClick={() => handleChangeTab(2)}
            >
              Details Product
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
        
        {/* <div className="w-full">
          {
            listInvoice?.data?.filter(invoice => invoice.status === 'DELIVERED'&& invoice.userId === userLogin?._id)?.map((invoice, index) => (
              invoice.product?.map((productId)=> {
                if (product?.data?._id === productId) {
                 return (<Comment comment={product?.comment?.data} question={product?.question?.data} productId={id}/>)
                 
                }
              })
            ))
          }
          
        </div> */}
        <Comment comment={product?.comment?.data} question={product?.question?.data} productId={id}/>
       
        {
          products && (
            <>
              <p className="text-black font-medium text-2xl py-5 my-10 border-b border-gray-300">Suggestions for you</p>
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
              <p className="text-black font-medium text-2xl py-5 my-10 border-b border-gray-300">Recently Viewed</p>
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
                        <ProductCardV2 product={product} key={index} />
                      )
                    })
                  }

                </Carousel>
              </div>
            </>

          )
        }

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
