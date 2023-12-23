import React, {useState, useEffect} from 'react'
import Input from '../../components/Input/Input'
import { useDispatch } from 'react-redux'
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../store/product/hook'
import { updateSearchData} from '../../store/search/index'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../store/search/hook'
import ProductCardCompare from '../../components/Card/ProductCardCompare'

const ProductCompare = ({ onClose }) => {
  const [textSearch, setTextSearch] = useState()
  const dispatch = useDispatch()
  const products = useProducts()

  useFetchProducts()
  useFetchAllProductType()
  useUpdateQuery()
  useUpdateSearch()

  const updateFieldSearch = (field, value) => {
    dispatch(updateSearchData({ [field]: value }))
  }

  const searchData = useSearchData()
  const handleChangeInput = (e) => {
    setTextSearch(e.target.value)
  }
  useEffect(() => {
    if (textSearch !== undefined) {
        updateFieldSearch('textSearch', textSearch)
    }
  }, [textSearch])

  useEffect(() => {
      setTextSearch(searchData?.textSearch)
  }, [])


  return (
    <div className="bg-gray-800 opacity-95 fixed w-screen h-full top-0 left-0 z-[100001]">
      <div className='flex justify-center items-center h-full opacity-100'>
        <div className='h-[600px] w-[800px] bg-white opacity-100 overflow-y-scroll p-6 rounded-xl'>
          <p className='z-1 cursor-pointer absolute hover:text-[#62B4FF] ml-[300px] md:ml-[700px]' onClick={onClose}>Close</p>
          <div className="container-searchbar">
              <Input
                  className="border border-gray-500 rounded-lg text-md text-black mb-[20px] pl-9 mt-8"
                  onChange={handleChangeInput}
                  dark={1}
                  type="text"
                  placeholder="Search by Product Name"
              />
              <span className='icon-search'><i className="fa-solid fa-magnifying-glass"></i></span>
              <div className='h-auto bg-red-300 rounded-xl overflow-hidden border'>
              {
                products?.data?.map((product, index) => {
                  return (
                      <ProductCardCompare product={product} key={index} closeModal={onClose} />
                  )
                })
              }
              </div>
              

            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCompare
