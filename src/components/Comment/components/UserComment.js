import React from 'react'
import Star from '../../../components/Star/Star'
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'

export default function UserComment({ name, createdAt, numOfStar = 5, comment }) {

    return (
        <div className="max-w-screen-xl w-full mx-auto border-t border-gray-300 py-8">
            <div className="flex items-center justify-between mb-2">
                <div className="flex ml-6">
                    <img  className="userShowImg" src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt=""/>
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
