import classnames from 'classnames'
import React from 'react'

export default function Star({ numberStar = 5, className, size = "md"}) {

  var decimalStr = 0;
  var remainStar = 0;

  if(!Number.isInteger(numberStar)) {
    decimalStr = numberStar.toString().split('.')[1]
  }

  if(decimalStr) {
    remainStar = 5 - Math.floor(numberStar) - 1
  } else {
    remainStar = 5 - Math.floor(numberStar)
  }
  numberStar = Math.floor(numberStar)
  return (
    <div
    className={classnames(
      { 'text-3xl': size === '3xl' },
     {'text-2xl': size === '2xl'},
     {'text-xl': size === 'xl'},
     {'text-md': size === 'md'},
     {'text-lg': size === 'lg'},
     "flex items-center text-red-500",
      className
    )}
    >
      
      {
        Array.from({ length: numberStar }, (_, index) => <i key={index} className='bx bxs-star'></i>)
      }
      {
        decimalStr ? <i className='bx bxs-star-half' key="half-star"></i> : null
      }
      {
        Array.from({ length: remainStar }, (_, index) => <i key={index} className='bx bx-star' ></i>)
      }

    </div>
  )
}