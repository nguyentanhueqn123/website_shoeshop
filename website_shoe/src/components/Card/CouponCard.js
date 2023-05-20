import React from 'react'
import '../../styles/cardProduct.scss'
import { formatDDMMYYYYHHmm } from '../../utils/formatDatetime'

export default function ProductCardV2({ coupon }) {

    return (
        <div className="w-full flex bg-white group product-card-container">
                <div className="p-5 text-left flex justify-center items-center">
                    <img className="h-[60px] w-[60px]" src="/images/icon/bags.png" alt="icon-bag" />
                    <p className="text-[#334862] hover:text-black text-[1rem] ml-4 pl-3 border-l-2 border-dashed">
                        <span className="font-bold text-[#62B4FF]"> Up to {coupon?.value} % Off </span><br/>
                        ID Code: <span className="font-bold">{coupon?.code}</span><br/>
                        Remaining: <span className="font-bold">{coupon?.amount}</span> <br/>
                        Shelf time: <span className="font-bold text-[#62B4FF]">{formatDDMMYYYYHHmm(coupon?.endDate)}</span> 
                    </p>
                </div>
        </div>
    )
}
