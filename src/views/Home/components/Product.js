import React from 'react'
import "react-multi-carousel/lib/styles.css";
export default function Product() {
    

    return (
        <div className="w-full bg-white py-8 md:py-16">
            <div className="w-full mb-5 md:mb-10  md:px-[10%]">
                <h1 className="w-full flex justify-center text-xl md:text-2xl text-black-1">This week's</h1>
                <h1 className="w-full flex justify-center uppercase text-xl md:text-3xl text-black-1 font-medium tracking-[.5rem]">HIGHLIGHT</h1>
            </div>
   
            <div className="max-w-screen-xl w-full mx-auto">
                <div className="w-full flex flex-col md:flex-row md:justify-between">
                    <div className="md:w-1/3 flex flex-col items-center">
                        <img className="w-full h-full md:pr-8 mb-4" src="/images/home/h1.jpg" alt="no_image" />
                        <p className="md:text-lg">DESCENTE</p>

                    </div>
                    <div className="w-full md:w-2/3 flex flex-row mt-4 md:mt-0">
                        <div className="w-1/2 pr-2 md:pr-4 flex flex-col items-center">
                            <img className="mb-4" src="/images/home/h2.jpg" alt="no_image" />
                            <p className="md:text-lg">NEW BALANCE</p>
                        </div>
                        <div className="w-1/2 pl-2 md:pl-4 flex flex-col items-center">
                            <img className="mb-4" src="/images/home/h3.jpg" alt="no_image" />
                            <p className="md:text-lg">NERDY</p>

                        </div>
                        
                    </div>

                </div>
                
           </div>
          
        </div>
    )
}
