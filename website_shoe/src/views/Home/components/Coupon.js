import React from 'react'
import CouponCard from '../../../components/Card/CouponCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFetchListCoupon, useListCoupon } from '../../../store/coupon/hook';

//
export default function TopProduct() {
    //
    useFetchListCoupon()
    const listCoupon = useListCoupon();
    // console.log("====> Discount: ", listCoupon);

    //

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
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

    if(listCoupon === undefined) {
        return <p className='h-full flex justify-center justify-items-center mt-4'>Loading...</p>

    }

    return (
        <div className="w-full bg-white pb-16">
            <div className="mb-10">
                <h1 className="uppercase text-2xl text-black-1 px-[12%] font-medium">Best Discount Coupons</h1>
            </div>
   
            <div className="max-w-screen-xl w-full mx-auto">
                <div className="mr-[-8px] ml-[-8px]">
                    <Carousel
                        swipeable
                        // autoPlay
                        // autoPlaySpeed={2500}
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
                            listCoupon?.data?.map((coupon, index) => {
                                return (
                                    <CouponCard coupon={coupon} key={coupon?._id} />
                                )
                            })
                        }

                    </Carousel>
                </div>        
           </div>
          
        </div>
    )
}
