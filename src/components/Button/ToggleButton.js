import React, { useState } from 'react'

export default function ToggleButton({ handleRight, handleLeft, isChecked }) {

  const [isRight, setIsRight] = useState(isChecked)
    const handleClickButton = () => {
        setIsRight(!isRight)

        if(isRight) {
            handleLeft()
        } else {
            handleRight()
        }
    }
  return (
    <button
          onClick={handleClickButton}
          className="text-3xl"
    >
      {isRight ? <i className='bx bx-toggle-right text-green-1' ></i> : <i className='bx bx-toggle-left text-orange-1' ></i>}
    </button>   
  )
}
