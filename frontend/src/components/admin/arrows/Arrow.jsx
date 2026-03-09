import React from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const LeftArrow = ({ onClick }) => {
  return (
    <div
        onClick={onClick} 
        className='bg-gray-200/40 rounded-full p-4 text-white text-sm absolute z-10 top-1/2 left-0 cursor-pointer'>
      <FaChevronLeft /> 
    </div>
  )
}

export const RIgthArrow = ({ onClick }) => {
  return (
    <div
        onClick={onClick} 
        className='bg-gray-200/40 rounded-full p-4 text-gray-300 text-sm absolute z-10 top-1/2 right-0 cursor-pointer'>
        <FaChevronRight />
    </div>
  )
};
