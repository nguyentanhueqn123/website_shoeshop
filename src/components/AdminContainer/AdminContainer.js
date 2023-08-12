import React from 'react'
import classnames from 'classnames'
export default function AdminContainer({ children, className }) {
    return (
        <div className={classnames("w-full ml-[230px] min-h-screen px-5", className)}>
            <div className="mx-auto py-25 max-w-screen-2xl ml-4 mr-4">
                {children}
            </div>
        </div>
    )
}
