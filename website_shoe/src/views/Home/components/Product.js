import React from 'react'
// import Container from '../../../components/Container/Container';
import { Link } from 'react-router-dom';
// import CartIcon from '../../../components/CartIcon/CartIcon';

export default function Product() {
    return (
        <div className="w-full bg-green-5 py-20">
            <div className="mb-10">
                <h1 className="uppercase text-4xl text-black-1 text-center font-medium">Mua với giá sốc</h1>
            </div>
            {/* <Container className="flex-col items-center">
                <div className="flex sm:flex-row flex-col items-center w-full mb-10">
                    <div className="sm:w-1/4 w-full h-full text-center sm:mr-5 relative product-container group">
                        <Link to="/san-pham/62acf0485d015cc3eebdb88e">   
                            <img src="/images/home/product2.png" alt="product" className="w-full" />
                            <p className="text-black-1 text-md font-medium mb-3">Nồi chiên không dầu Electrolux E6AF1</p>
                            <p className="text-black-1 text-md font-medium mb-3">
                                <del className="opacity-50">
                                   2,250,000   <span className="underline">đ</span>
                                </del>
                                <span className="text-black-1 ml-2">
                                    990,000 <span className="underline">đ</span>
                                </span> 
                            </p>
                        </Link>
                        <CartIcon className="bottom-20 left-2 cursor-pointer group-hover:opacity-100"/>
                    </div>
                    <div className="sm:w-1/4 w-full h-full text-center sm:mr-5 relative group">
                        <Link to="/san-pham/62acf0f85d015cc3eebdb88f">
                            <img src="/images/home/product3.png" alt="product" className="w-full"  />
                            <p className="text-black-1 text-md font-medium mb-3">Máy xay sinh tố Tefal BL2C1166 450W</p>
                            <p className="text-black-1 text-md font-medium mb-3">
                                <del className="opacity-50">
                                    890,000   <span className="underline">đ</span>
                                </del>
                                <span className="text-black-1 ml-2">
                                    399,000 <span className="underline">đ</span>
                                </span>
                            </p>
                        </Link>
                        <CartIcon className="bottom-20 left-2 cursor-pointer group-hover:opacity-100" />
                    </div>
                    <div className="sm:w-1/2 w-full">
                        <img src="/images/home/product1.png" alt="model" className="w-full"  />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col items-center w-full">
                    <div className="sm:w-1/2 w-full sm:mr-5">
                        <img src="/images/home/product4.png" alt="model" className="w-full h-[350px] object-cover" />
                    </div>
                    <div className="sm:w-1/4 w-full h-full text-center sm:mr-5 relative group">
                        <Link to="/san-pham/62acf1b45d015cc3eebdb890">
                            <img src="/images/home/product2.1.png" alt="product" className="w-full"  />
                            <p className="text-black-1 text-md font-medium mb-3">Bàn Ủi Hơi Nước BEKO SIM3617</p>
                            <p className="text-black-1 text-md font-medium mb-3">
                                <del className="opacity-50">
                                    480,000   <span className="underline">đ</span>
                                </del>
                                <span className="text-black-1 ml-2">
                                    279,000 <span className="underline">đ</span>
                                </span>
                            </p>
                        </Link>
                        <CartIcon className="bottom-20 left-2 cursor-pointer group-hover:opacity-100" />
                    </div>
                    <div className="sm:w-1/4 w-full h-full text-center sm:mr-5 relative group">
                        <Link to="/">
                            <img src="/images/home/product2.2.png" alt="product" className="w-full" />
                            <p className="text-black-1 text-md font-medium mb-3">Quạt Bàn YANFAN B202</p>
                            <p className="text-black-1 text-md font-medium mb-3">
                                <del className="opacity-50">
                                    350,000   <span className="underline">đ</span>
                                </del>
                                <span className="text-black-1 ml-2">
                                    239,000 <span className="underline">đ</span>
                                </span>
                            </p>
                        </Link>
                        <CartIcon className="bottom-20 left-2 cursor-pointer group-hover:opacity-100" />
                    </div>
                    
                </div>
            </Container> */}
        </div>
    )
}
