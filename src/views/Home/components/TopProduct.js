import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCardV2 from '../../../components/Card/ProductCardV2';
import LoadingProductV2 from '../../../components/LoadingPage/LoadingProductV2';
import { useFetchProducts, useProducts } from '../../../store/product/hook';

export default function TopProduct() {
    const { t } = useTranslation("home");

    useFetchProducts()
    const products = useProducts()

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

    if(products === undefined) {
        return <LoadingProductV2/>
    }

    return (
        <div className="w-full bg-white py-8 md:py-16">
            <div className="max-w-screen-xl w-full mx-auto">
                <div className="mb-5 md:mb-10">
                    <h1 className="uppercase text-xl md:text-2xl text-black-1 font-medium">{t('text-purchased')}</h1>
                </div>
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
                                if(index === 8) {
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
          
        </div>
    )
}
