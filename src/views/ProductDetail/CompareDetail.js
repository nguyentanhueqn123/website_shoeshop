import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import LoadingPage from '../../components/LoadingPage/Loading';
import Star from '../../components/Star/Star';
import { useProduct } from '../../store/product/hook';


const CompareDetail = () => {
  const { t } = useTranslation("product_detail");

  const product = useProduct();
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
    return <LoadingPage/>
  }

  return (
    <div className='md:px-[12%] my-4 md:my-8'>      
      <div className='flex flex-col md:flex-row justify-center'>
        <div className='w-full md:w-1/3 text-lg text-center md:text-start'>
          <p>{t('compareProducts.title')}</p>
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
            
            <p className='mt-4'>{t('compareProducts.quantity')}: {productInfo.product1?.metal}</p>
            <p className=''>{t('compareProducts.weigh')}: {productInfo.product1?.size} gam</p>
            <p className='text-[#62B4FF] mt-2'>{t('compareProducts.description')}:</p>
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
            <p className='mt-4'>{t('compareProducts.quantity')}: {productInfo.product2?.metal}</p>
            <p className=''>{t('compareProducts.weigh')}: {productInfo.product2?.size} gam</p>
            <p className='text-[#62B4FF] mt-2'>{t('compareProducts.description')}:</p>
            <div>{productInfo.product2?.description && productInfo.product2?.description.split(".").map((item, index) => (
                    <p key={index}>
                    • {item}
                      <br />
                    </p>
                  ))}</div>
          </div>
        </div>
      </div>
     
       
    </div>
  )
}

export default CompareDetail
