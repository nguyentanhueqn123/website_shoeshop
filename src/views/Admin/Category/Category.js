import React, { useState } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
// import Input from '../../../components/Input/Input' // ko dùng
// import Dropdown from '../../../components/Dropdown/Dropdown' // ko dùng
import Table from '../../../components/Table/Table'
import ActionGroup from '../../../components/ActionGroup/ActionGroup'
import { useFetchAllProductType, useAllProductType } from '../../../store/product/hook'
// import LoadingPage from '../../../components/LoadingPage/Loading' // ko dùng
import productApi from '../../../api/productApi'
import { useDispatch } from 'react-redux'
import { fetchAllProductType } from '../../../store/product'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';


export default function Category() {
    const navigate = useNavigate()
    useFetchAllProductType()
    const productTypes = useAllProductType()
    const [inputValue, setInputValue] = useState()
    const dispatch = useDispatch()
    const handleChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const updateProductType = async () => {
        try {
            dispatch(fetchAllProductType())
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteProductType = async (id) => {
        try {
            await productApi.deleteProductType(id)
            updateProductType()
        } catch (error) {
            console.log(error)
        }
    }

    const columnsTable = [
        {
            Header: 'ID',
            accessor: '_id',
            Cell: data => {
                return <span>
                    {data?.row?.original?._id?.slice(0, 4)}...{data?.row?.original?._id?.slice(data?.row?.original?._id?.length - 4, data?.row?.original?._id?.length)}
                </span>
            }
        },
        {
            Header: 'NAME',
            accessor: 'nameType',
        },
        {
            Header: 'NOTE',
            accessor: 'note',
        },
        {
            Header: 'ACTIONS',
            accessor: 'actions',
            Cell: data => {
                return <ActionGroup showEye={false}
                    onEdit={() => navigate(`/admin/category/edit-category/${data.row.original._id}`)}
                    onDelete={() => handleDeleteProductType(data.row.original._id)} />
            }
        }
    ]
     /// Handle Pagination func
     const [pageNumber, setPageNumber] = useState(0);
     const productsPerPage = 6;
     const pagesVisited = pageNumber * productsPerPage;
 
     const pageCount = Math.ceil(productTypes?.data?.length / productsPerPage);
 
     const changePage = ({ selected }) => {
     setPageNumber(selected);
     };
     ////

    return (
        <AdminContainer>
        
            <p className="text-lg font-medium mb-6">
                Category
            </p>

            <div className="mb-5">
            
                <button className="bg-[#62b4ff] rounded-lg px-10 hover:bg-[#349eff] w-full md:w-1/5 h-[50px]"
                    onClick={() => navigate('/admin/category/add-category')}
                >
                    <div className="flex items-center justify-center text-lg">
                        <i className='bx bx-plus mr-2 text-white'></i>
                        <span className="whitespace-nowrap text-white">Add Category</span>
                    </div>
                </button>
            </div>

            <div className="overflow-x-scroll md:overflow-hidden">
            {
                productTypes && <Table
                    columnsTable={columnsTable}
                    data={productTypes?.data.slice(pagesVisited, pagesVisited + productsPerPage)}
                />
            }

            </div>
            
            <ReactPaginate
              previousLabel={"Previous"}
              previousClassName="mr-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              nextLabel={"Next"}
              nextClassName="ml-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              pageCount={pageCount}
              pageClassName="px-3 py-1"
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive border px-3 py-1 rounded-lg bg-[#62B4FF] text-white"}
              className="flex justify-end w-full  my-3"
            />
        </AdminContainer>
    )
}
