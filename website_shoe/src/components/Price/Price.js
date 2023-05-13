import React from 'react'
import classnames from "classnames"
import { formatPrice } from './../../utils/formatPrice';

export default function Price( {price, priceDel, color="text-white-1", className}) {
  return (
      <p className={classnames("text-md font-medium", color, className)}>
          {
              priceDel ? (
                  <del className="opacity-50">
                      {formatPrice(priceDel)}   <span className="underline">đ</span>
                  </del>
              ) : null
          }
          <span className={classnames("ml-2", color, className)}>
              {formatPrice(price)} <span className="underline">đ</span>
          </span>
      </p>
  )
}

