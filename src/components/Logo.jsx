import React from 'react'
import images from "../assets/images.jpeg"

function Logo({width = '100px'}) {
  return (
    <div className=' sm:ml-0  flex justify-center'>
      <img src={images} alt="" className='rounded-full h-10 '/>
      <span className='text-white pt-1 pl-1 font-montserrat'>OGI</span>
    </div>
  )
}

export default Logo