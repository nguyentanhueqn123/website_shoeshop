import React, { useState} from "react";
import { useSelector} from "react-redux";
import ProductCompare from "../../views/ProductDetail/ProductCompare";
import { Link } from "react-router-dom";

const Compare = ({ imageProduct, nameProduct }) => {
  const selectedProduct = useSelector((state) => state.productCompare.selectedProduct);

  const [showProductCompare, setShowProductCompare] = useState(false);

  const handleAddProductCompare = () => {
    setShowProductCompare(true);
  }

  const handleCloseProductCompare = () => {
    setShowProductCompare(false);
  }


  return (
    <div className="relative">
      <div className="h-[220px] md:h-[150px] w-full bottom-0 left-0 right-0 z-[10000] fixed">
        <div className="mx-0 md:mx-[15%] h-full bg-white rounded-t-xl border-inherit border overflow-hidden shadow-[12px_35px_60px_15px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row p-4">
            <div className="w-full md:w-2/3 flex flex-row">
              <div className="w-full flex flex-col justify-center items-center border-r-[1px]">
                <img className="h-[100px] w-auto object-cover" src={imageProduct} alt={nameProduct}></img>
                <p>{nameProduct}</p>
              </div>
              <div className="w-full flex flex-col justify-center items-center md:border-r-[1px]">
                <div className="cursor-pointer flex flex-col justify-center items-center" onClick={handleAddProductCompare}>
                  {selectedProduct.image
                    ? <img className="h-[100px] w-auto" src={`${selectedProduct.image}`} alt="" />
                    :<img src="https://scontent.fsgn10-2.fna.fbcdn.net/v/t1.15752-9/413428900_377969161376346_6778087915424795519_n.png?stp=cp0_dst-png&_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=9pxcADSn9SoAX9nq147&_nc_oc=AQkq-PWzFBv589dr9IdE3T7C3Qf_IsKTAOwVU0gMr6Q0wZtfrImfqroY32Gz8TdQo1LkEuDpFVF1uS-HlTUN3Y7n&_nc_ht=scontent.fsgn10-2.fna&oh=03_AdRcKatGi_OaoWJURsGMX7e0OKkK8vZKIFlkRND53WtwmA&oe=65AC2075" alt="" />
                  }
                  {selectedProduct.name 
                    ? <p className="ml-4 md:ml-0">{selectedProduct.name}</p> 
                    : <p className="mt-2">Add Product</p>
                  }
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 mt-2 md:mt-0 flex flex-col justify-center items-center text-center">
              {selectedProduct.name 
                ? <Link to="/sosanh-sanpham" className="bg-[#62B4FF] w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-pointer hover:opacity-80 hover:text-black">Compare Now</Link>
                : <div className="bg-[#62B4FF] w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-not-allowed opacity-50">Compare Now</div>
              }
            </div>
          </div>
        </div>
      </div>
      {showProductCompare && <ProductCompare onClose={handleCloseProductCompare} />}


    </div>
  );
};

export default Compare;