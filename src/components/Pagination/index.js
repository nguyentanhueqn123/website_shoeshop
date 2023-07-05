import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from 'react-feather'
import classnames from 'classnames'

const Pagination = ({ children, className, itemsPerPage, data, classNameContain }) => {
    const limitPage = Math.ceil(data?.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)
    const [inputPage, setInputPage] = useState(1)

    const indexOfLastElementCurrentPage = currentPage * itemsPerPage
    const indexOfFirstElementCurrentPage = indexOfLastElementCurrentPage - itemsPerPage

    const handleClickPrevPage = () => {
        let _currentPage = 0
        if (currentPage !== 1) {
            _currentPage = currentPage - 1
            setCurrentPage(_currentPage)
            setInputPage(_currentPage)
        } else {
            return
        }
    }

    const handleClickNextPage = () => {
        let _currentPage = 0
        if (currentPage !== limitPage) {
            _currentPage = currentPage + 1
            setCurrentPage(_currentPage)
            setInputPage(_currentPage)
        } else {
            return
        }
    }

    const handleInputPage = (e) => {
        e.preventDefault()
        if (e.target.value > limitPage || e.target.value < 0) {
            return
        }
        setInputPage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCurrentPage(inputPage)
    }

    return (
        <div className={classNameContain}>
            <div className={classnames(className, '')}>
                {React.Children.toArray(children).slice(indexOfFirstElementCurrentPage, indexOfLastElementCurrentPage)}
            </div>

            <div className="w-full flex items-center justify-center py-10">
                <button className="h-9 w-9 bg-gray-300 rounded-full flex items-center justify-center" onClick={handleClickPrevPage}>
                    <ChevronLeft />
                </button>

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        className="ring-2 bg-blue-1 text-white text-blue4 font-bold text-left text-sm-md rounded-xl w-16 h-9 border border-blue2 px-3 flex items-center ml-3 mr-1"
                        onChange={handleInputPage}
                        value={inputPage}
                    />
                </form>
                <p className="font-bold text-sm-md text-blue4 ml-1 mr-3">
                    <span className="mr-1">of</span>
                    {limitPage}
                </p>

                <button className="h-9 w-9 bg-gray-300 rounded-full flex items-center justify-center" onClick={handleClickNextPage}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}


export default Pagination
