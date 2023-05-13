import React from 'react'
import { FiChevronUp } from "react-icons/fi";

export default function OnTop() {
    return (
        <a href="#top">
            <div className="w-10 h-10 text-black flex items-center justify-center rounded-full shadow-sm bg-[#d4d4d4]">
                <FiChevronUp width={15} />
            </div>
        </a>
    )
}
