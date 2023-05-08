import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
export default function Dropdown({ titleDefault, reset, title, listDropdown, className, bgDropdown, classNameButton, label, value, onSelect, rounded="lg" }) {

    const [titleState, setTitleState] = useState(titleDefault || title)
    const [isShow, setIsShow] = useState(false)
    useEffect(() => {
        if (reset) {
            setTitleState(title)
        }
    }, [reset])


    useEffect(() => {
        setTitleState(titleDefault || title)
    }, [titleDefault])

    return (
        <div className={classnames("w-full text-md relative bg-white rounded-lg", className)}>
            <button
                className={
                    classnames("z-10 px-2 py-3 border w-full flex items-center justify-between opacity-80 h-10",
                        classNameButton,
                        { "border-black": !classNameButton},
                        `rounded-${rounded}`
                    )
                }
                onClick={(e) => {
                    e.preventDefault()
                    setIsShow(!isShow)
                }}
            >
                <p>
                    {titleState}
                </p>
                <i className='bx bxs-chevron-down'></i>
            </button>
            {
                isShow && (
                    <div className={classnames("border absolute w-full z-20", { " bg-white mt-2 rounded-lg py-2": !bgDropdown }, bgDropdown )}>
                        <ul>
                            {
                                listDropdown.map((item, index) => {
                                    return (
                                        <li key={index} className="py-1 hover:bg-blue-1 hover:text-white px-2 cursor-pointer"
                                            onClick={() => {
                                                onSelect(item?.[value] || item)
                                                setTitleState(item?.[label] || item)
                                                setIsShow(false)
                                            }}>
                                            {item?.[label] || item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
