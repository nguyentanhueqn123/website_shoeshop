import classnames from 'classnames'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProductCardV2 from '../../components/Card/ProductCardV2'
import Comment from '../../components/Comment'
import Compare from '../../components/Compare/Compare'
import { showToastError } from '../../components/CustomToast/CustomToast'
import Dropdown from '../../components/Dropdown/Dropdown'
import Price from '../../components/Price/Price'
import Star from '../../components/Star/Star'
import { SIZE } from '../../constants/index'
import { useFetchListInvoice } from '../../store/invoice/hook'
import { useFetchProduct, useFetchProducts, useProduct, useProducts } from '../../store/product/hook'
import { fetchUser } from '../../store/user'
import { addToCart } from './../../utils/addtoCart'


export default function ProductDetail() {
  const { t } = useTranslation(["product_detail", "product"]);
  // const listInvoice = useListInvoice()
  // console.log("===== list Invoice:", listInvoice?.data);
  useFetchListInvoice();

  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'));

  useFetchProduct();
  useFetchProducts();
  const product = useProduct();
  const products = useProducts();
  const [tab, setTab] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const handleChangeTab = (tab) => {
    setTab(tab)
  }


  // const deliveredInvoices = listInvoice?.data?.filter(invoice => invoice.status === 'DELIVERED'&& invoice.userId === userLogin?._id)
  //sài đc console.log("List Order Delivered: ",deliveredInvoices);

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
  
  /////
  const [inputValue, setInputValue] = useState(1);

  const [showCompare, setShowCompare] = useState(false);

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

  const handleCompare = () => {
    setShowCompare(!showCompare);
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

    <div className="w-full bg-white md:mt-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="hidden md:block flex items-center justify-between">
          {/* display path on Product */}
          <div className="flex items-center text-xl" id="top">
            <Link to="/" className="opacity-50 hover:opacity-100 uppercase">{t('product:path.home')}</Link>
            <span className="mx-3">/</span>
            <Link to="/danh-muc" className="opacity-50 hover:opacity-100 uppercase">{t('product:path.products')}</Link>
            <span className="mx-3">/</span>
            <p className="font-medium text-[#62B4FF]">
              {product?.data?.nameProduct}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:mt-6 p-4 md:border rounded-lg">
          <div className="w-full md:w-2/5">
            {
              <img src={product?.data?.image?.[0]} alt="product" className="w-full h-full object-cover" />
            }
          </div>

          <div className="w-full md:w-3/5 mt-2 md:mt-0 md:ml-10">
            <div className='flex justify-start items-center'>
              <div className='flex flex-col md:flex-row justify-start items-center'>
                <p className="text-black font-medium text-2xl opacity-80 mb-3">
                  {product?.data?.nameProduct}
                </p>
                <div className='text-[#62B4FF] cursor-pointer mb-2 ml-4 items-center text-lg' onClick={handleCompare}>
                  <i className="fa-solid fa-plus"></i>
                  <span className="ml-1">{showCompare ? t('hide') : t('compare')}</span>
                </div>
              </div>
                {showCompare && <Compare id={product?.data?._id} imageProduct={product?.data?.image?.[0]} nameProduct={product?.data?.nameProduct} />}
            </div>
            
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
                {t('view')} {product?.comment?.data?.length || 0} {t('review')}
              </a>
            </div>
            <div className="flex justify-between md:justify-start items-center">
              <Price
                price={product?.data?.priceSale}
                priceDel={product?.data?.price}
                color="black"
                className="text-[2rem]"
              />
              <span className="rounded-lg text-[14px] px-2 md:ml-[56px] bg-[#62B4FF] text-white">{t('decrease')} {product?.data?.sale}%</span>
            </div>
            <div className="container-box w-full flex justify-between my-4">
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
              <div className="flex md:w-4/5 items-center ml-5">
                <p className="mr-3">{t('quantity')}:</p>
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
              {t('descriptionDetails')}
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
                {t('addToCart')}
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

        <div className="w-full md:mt-20" id="des-detail" >
          <div className="flex items-center mb-4 border-t-4 border-[#F7F8F9]">
            <div
              className={classnames("uppercase mr-4 px-12 py-5 cursor-pointer", { "border-b-4 border-[#62B4FF] text-[#62B4FF]": tab === 1 })}
              onClick={() => handleChangeTab(1)}
            >
              {t('description')}
            </div>
            <div
              className={classnames("uppercase px-12 py-5 cursor-pointer", { "border-b-4 border-[#62B4FF] text-[#62B4FF]": tab === 2 })}
              onClick={() => handleChangeTab(2)}
            >
              {t('detailsProduct.title')}
            </div>

          </div>

          {
            tab === 1 && (
              <div>
              {
                product?.data?.description.split(".").map((item, index) => (
                  <p className='mx-4' key={index}>
                  • {item}
                    <br />
                  </p>
                ))
              }
            </div>
            )
          }
          {
            tab === 2 && (
              <div className="px-5 opacity-80">
                {
                  product?.data?.metal && (
                    <>
                      <div className="flex items-start mb-3">
                        <p className="text-black font-bold uppercase">
                          {t('detailsProduct.quantity')}:
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
                        <p className="text-black font-bold mb-1 uppercase">
                          {t('detailsProduct.weigh')}:
                        </p>
                        <p>
                          {product?.data?.size} gam
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
            <div className="mx-4 md:mx-auto">
              <p className="text-black font-medium text-xl md:text-2xl py-5 my-10 border-b border-gray-300">{t('suggestion')}</p>
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
                        // eslint-disable-next-line array-callback-return
                        return
                      }
                      return (
                        <ProductCardV2 product={product} key={product?._id} />
                      )
                    })
                  }

                </Carousel>
              </div>
            </div>
          )
        }

        {
          products && (
            <div className="mx-4 md:mx-auto">
              <p className="text-black font-medium text-xl md:text-2xl py-5 my-10 border-b border-gray-300">{t('recentlyViewed')}</p>
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
            </div>

          )
        }

        <div className="w-full border-gray-300 py-10">
          <p className="font-medium text-lg text-center mb-5">
            - AS SEEN IN -
          </p>
          <div className="w-full flex flex-col md:flex-row items-center md:justify-around" >
            <div className="mt-6 md:mt-0">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878527/brand-story/Elle.svg" alt="icon" />
            </div>
            <div className="mt-6 md:mt-0">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878532/brand-story/Business_Insider.svg" alt="icon" />
            </div>
            <div className="mt-6 md:mt-0">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572885812/brand-story/fast-company.svg" alt="icon" />
            </div>
            <div className="mt-6 md:mt-0">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878522/brand-story/WWD.svg" alt="icon" />
            </div>
            <div className="mt-6 md:mt-0">
              <img src="https://res.cloudinary.com/mejuri-com/image/upload/v1572878529/brand-story/Coveteur.svg" alt="icon" />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
