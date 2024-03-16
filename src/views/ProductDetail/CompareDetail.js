import React, {useEffect, useState} from 'react'
import { useProduct, useProducts } from '../../store/product/hook'
import { useSelector } from 'react-redux';
import Star from '../../components/Star/Star';
import Carousel from "react-multi-carousel";
import ProductCardV2 from '../../components/Card/ProductCardV2';
import productApi from '../../api/productApi';
import { useParams } from 'react-router-dom';

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
const CompareDetail = () => {

  const product = useProduct();
  const products = useProducts()
  const commentData = product?.comment?.data;

  // const selectedProduct = useSelector((state) => state.productCompare.selectedProduct);
  // console.log("id1 và id2: ", product?.data?._id, " " , selectedProduct._id)

  const { id1, id2 } = useParams(); 
  const [productInfo, setProductInfo] = useState({ product1: null, product2: null });

  let starAvg = 0;
  if (commentData && commentData.length > 0) {
    const starSum = commentData.reduce((acc, comment) => acc + comment.star, 0);
    starAvg = starSum / commentData.length;
  }

  useEffect(() => {
    const fetchProductInfo = async () => {
        try {
            const response1 = await productApi.getCompareProducts(id1, id2);
            setProductInfo({ product1: response1.data.product1, product2: response1.data.product2 });
        } catch (error) {
            console.error('Failed to fetch product info:', error);
        }
    };

    fetchProductInfo();
  }, [id1, id2]);

  // Render UI dựa trên productInfo
  if (!productInfo.product1 || !productInfo.product2) {
    return <div className='text-center mt-4'>Loading...</div>;
  }

  return (
    <div className='md:px-[12%] my-4 md:my-8'>      
      <div className='flex flex-col md:flex-row justify-center'>
        <div className='w-full md:w-1/3 text-lg text-center md:text-start'>
          <p>Compare Product</p>
          <p className='mt-2 uppercase font-semibold text-[#62B4FF]'>{productInfo.product1?.nameProduct}</p>
          &
          <p className='mt-2 uppercase font-semibold text-[#62B4FF]'>{productInfo.product2?.nameProduct}</p>
        </div>
        <div className='w-full md:w-2/3 grid grid-cols-2 md:gap-5 mt-2 md:mt-0'>
          <div className='border p-2 text-sm md:text-base md:p-6 overflow-hidden'>
            <img className='object-cover h-[150px] md:h-[380px] w-full mt-[-20px]' src={`${productInfo.product1?.image?.[0]}`} alt="" />
            <p className='mt-4 md:text-lg font-semibold'>{productInfo.product1?.nameProduct}</p>
            <p className=' opacity-80'>{productInfo.product1?.price} đ -{productInfo.product1?.sale}%</p>
            <p className='text-red-400 font-semibold'>{productInfo.product1?.priceSale} đ</p>
            <div className='flex flex-row'>
              <span className="mr-2">
                {
                  starAvg.toFixed(1)
                }
              </span>
              <Star
                numberStar={starAvg}
                size="xl"
              />
            </div>
            
            <p className='mt-4'>Quantity: {productInfo.product1?.metal}</p>
            <p className=''>Weigh: {productInfo.product1?.size} gam</p>
            <p className='text-[#62B4FF] mt-2'>Description:</p>
            <div>{productInfo.product1?.description && productInfo.product1?.description.split(".").map((item, index) => (
                    <p key={index}>
                    • {item}
                      <br />
                    </p>
                  ))
            }
            </div>

          </div>
          <div className='border p-2 text-sm md:text-base md:p-6 overflow-hidden'>
            <img className='object-cover h-[150px] md:h-[380px] w-full mt-[-20px]' src={`${productInfo.product2?.image}`} alt="" />
            <p className='mt-4 md:text-lg font-semibold'>{productInfo.product2?.nameProduct}</p>
            <p className=' opacity-80'>{productInfo.product2?.price} đ   -{productInfo.product2?.sale}%</p>
            <p className='text-red-400 font-semibold'>{productInfo.product2?.priceSale} đ</p>
            <div className='flex flex-row'>
              <span className="mr-2">
                {
                  starAvg.toFixed(1)
                }
              </span>
              <Star
                numberStar={starAvg}
                size="xl"
              />
            </div>
            <p className='mt-4'>Quantity: {productInfo.product2?.metal}</p>
            <p className=''>Weigh: {productInfo.product2?.size} gam</p>
            <p className='text-[#62B4FF] mt-2'>Description:</p>
            <div>{productInfo.product2?.description && productInfo.product2?.description.split(".").map((item, index) => (
                    <p key={index}>
                    • {item}
                      <br />
                    </p>
                  ))}</div>
          </div>
        </div>
      </div>
      {
          products && (
            <div className="mx-4 md:mx-auto">
              <p className="text-black font-medium text-xl md:text-2xl py-5 my-10 border-b border-gray-300">Suggestions for you</p>
              <div className="mr-[-8px] ml-[-8px]">
                <Carousel
                  swipeable
                  autoPlay
                  responsive={responsive}
                  autoPlaySpeed={2000}
                  draggable={true}
                  showDots={false}
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
            </div>
          )
      }

       
    </div>
  )
}

export default CompareDetail
