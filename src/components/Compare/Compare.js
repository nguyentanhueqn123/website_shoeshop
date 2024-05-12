import React, { useState} from "react";
import { useSelector} from "react-redux";
import ProductCompare from "../../views/ProductDetail/ProductCompare";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Compare = ({ imageProduct, nameProduct, id }) => {
  const { t } = useTranslation("product_detail");

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
                {/* <p>{id}</p> */}

              </div>
              <div className="w-full flex flex-col justify-center items-center md:border-r-[1px]">
                <div className="cursor-pointer flex flex-col justify-center items-center" onClick={handleAddProductCompare}>
                  {selectedProduct.image
                    ? <img className="h-[100px] w-auto" src={`${selectedProduct.image}`} alt="" />
                    :<img src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t1.15752-9/432397154_2388961204641817_5867822921525463661_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGrTRiR9DNMlM_5TdRa1aNCb3vw1NE7AzJve_DU0TsDMqVljdJcQvQ9IHOaDOfbSQkq9ohxPIKEcswuoI6_bFdM&_nc_ohc=0lJHyXdjAkkAX80TpY7&_nc_ht=scontent.fsgn7-2.fna&oh=03_AdSx0SVALYz8D4apkuCVj6iKzc5mqDeFpyLPioqMlNQRzA&oe=661D1791" alt="" />
                  }
                  {selectedProduct.name 
                    ? <p className="ml-4 md:ml-0">{selectedProduct.name}</p> 
                    : <p className="mt-2">{t('compareProducts.box.title')}</p>
                  }
                </div>
              </div>
            </div>
            {/* {console.log("sp1: ", nameProduct)}
            {console.log("sp2: ", selectedProduct.name)} */}

            <div className="w-full md:w-1/3 mt-2 md:mt-0 flex flex-col justify-center items-center text-center">
              {selectedProduct.name 
                ? <Link to={`/so-sanh/${id}/${selectedProduct._id}`} className="bg-[#62B4FF] w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-pointer hover:opacity-80 hover:text-black">{t('compareProducts.box.btnCompare')}</Link>
                : <div className="bg-[#62B4FF] w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-not-allowed opacity-50">{t('compareProducts.box.btnCompare')}</div>
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