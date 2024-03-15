import React from 'react'
import Star from '../../../components/Star/Star'
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'

export default function UserComment({name, image,  createdAt, numOfStar = 5, comment }) {

    return (
        <div className="max-w-screen-xl w-full mx-auto border-t border-gray-300 py-8">
            <div className="flex items-center justify-between mb-2">
                <div className="flex ml-6">
                    <img className="userShowImg" src={image || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"} alt="" />
                    <div className="ml-2">
                        <div className="text-yellow-2 text-md mb-2">{name}</div>
                        <Star
                        numberStar={numOfStar || 0}
                        />
                        <p className="text-md mt-2">
                            {comment || ''}
                        </p>
                    </div>
                </div>
                <div className="opacity-80 text-sm-md">{formatDDMMYYYYHHmm(createdAt)}</div>
            </div>

        </div>
    )
}
