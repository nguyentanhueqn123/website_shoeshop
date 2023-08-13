import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
export default function Banner() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            partialVisibilityGutter: 16,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            partialVisibilityGutter: 16,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 16,
        }
       
    };
    return (
        <div className="mx-auto mt-2 md:mt-6 rounded-lg max-w-screen-xl sm:h-[400px] max-h-[400px] bg-black bg-cover bg-center object-cover overflow-hidden">
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
                        minimumTouchDrag={80}
                        slidesToSlide={1}
                        itemClass="banner-carousel-items"
                        containerClass="banner-carousel-container"
                        partialVisible
                    >
                    <div className="container-box">
                        <img className='absolute' src="https://www.johncraig.co.za/wp-content/uploads/Converse-Brand-Page-Banner.jpg" alt="" />
                        <Link to="/danh-muc">
                            <button className="hidden md:block absolute ml-[10%] bottom-[25%] bg-white rounded-lg px-7 py-3 hover:bg-[#eee] text-blak font-bold">
                                <div className="text-center uppercase">
                                    Explore now
                                </div>
                            </button>
                        </Link>
                    </div>
                    <img src="https://cdn2.avada.io/media/resources/XUTbX9d.jpg" alt="" />  
                    <img src="https://www.rebelsport.co.nz/globalassets/2.-rebel-sport/002.-category-pages/brands/converse/converse-image-main.jpg" alt="" />

            </Carousel>
        </div>
    )
}
