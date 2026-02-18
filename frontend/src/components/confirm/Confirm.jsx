
import React from 'react'

const Confirm = ({ onClick, close }) => {
  return (
    <div className='inset-0 fixed backdrop-blur-sm bg-black/40 z-50 flex items-center justify-center'>

        <div className='bg-white rounded-2xl p-2 flex flex-col items-center gap-5 w-[80%] md:w-[30%]'>
            <h1 className='font-bold text-xl md:text-2xl'>Are you sure ?</h1>
            <p className='w-full text-center'>Click confirm to delete product <br /> be sure want to proceed with this, once confirmed this action cannot be reversed! </p>
            <div className='flex flex-row items-center w-full gap-5 border-t border-gray-400 pt-2' >
                <button
                    onClick={close}
                    className='border border-gray-500 rounded-xl p-2 w-full cursor-pointer'>Close</button>
                <button 
                    onClick={onClick}
                    className='bg-red-500 p-2 rounded-xl w-full cursor-pointer'>Confirm</button>
            </div>
        </div>
      
    </div>
  )
}

export default Confirm
