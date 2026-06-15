import React from 'react'

const CardPlaceholder = () => {
  return (
    <div
        className='group animate-pulse flex flex-col gap-4'>
        
        <div className='w-40 sm:w-65 md:w-40 h-40 sm:h-65 md:h-40 rounded-lg bg-gray-200 '></div>
        <span className='w-full flex items-center justify-between'>
            <span className='rounded-lg p-2 w-30 h-5 bg-gray-200'></span>
            <span className='rounded-full p-3 bg-gray-200'></span>
        </span>
      
    </div>
  )
}

export default CardPlaceholder
