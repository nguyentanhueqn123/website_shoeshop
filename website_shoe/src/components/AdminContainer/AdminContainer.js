import React from 'react'
import classnames from 'classnames'
export default function AdminContainer({ children, className }) {
    return (
        <div className={classnames("w-full bg-dark-2 ml-[230px] min-h-screen px-5", className)}>
            <div className="mx-auto py-10 max-w-screen-2xl text-white">
                {children}
            </div>
        </div>
    )
}
