import React from 'react'
import '../../styles/cardProduct.scss'
import Price from '../../components/Price/Price'
import { useDispatch } from 'react-redux'
import { selectProductCompare } from '../../store/compare/productCompareSlice'
import {showToastSuccess} from '../../components/CustomToast/CustomToast'


export default function ProductCardCompare({ product,closeModal }) {
    const dispatch = useDispatch();

    const handleAddProductCompare = (e) =>{
        e.stopPropagation(); 
        
        dispatch(selectProductCompare({_id: product?._id, name: product?.nameProduct, image: product?.image?.[0], price: product?.price, priceSale: product?.priceSale, metal: product?.metal,
             description: product?.description, sale: product?.sale, size: product?.size}));
        // alert(`Đã thêm sản phẩm: ${product?._id}`);
        showToastSuccess("Add Product Compare Successfully");
        closeModal();
    }
   
    return (
        <div className="flex flex-col bg-white relative group border"
            onClick={() => {
            }}
        >
            <div className="flex flex-row justify-between items-center p-4">
                <div className='w-full flex items-center h-auto'>
                    <div className="w-[81px] md:h-[81px] top-[-32px]">
                        {product?.image?.[0] && <img src={product?.image?.[0]} alt="product" className="object-cover" />}
                    </div>
                    <div className="ml-3">
                        {/* <div className="text-[#334862] font-bold">{product?._id}</div> */}
                        <div className="text-[#334862] font-bold">{product?.nameProduct}</div>
                        <Price
                            price={product?.priceSale}
                            // priceDel={product?.price}
                            color="black"
                        />
                    </div>
                </div>
                <div onClick={handleAddProductCompare} className='w-[32px] h-[32px] flex justify-center items-center rounded-full bg-[#62B4FF] cursor-pointer hover:border-2'>
                    <i className="fa-solid fa-plus text-white"></i>
                </div>
            </div>
        </div>
    )
}