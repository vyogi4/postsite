import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import img from '../assets/profile.png'
import { useLocation } from 'react-router-dom'

function PostCard({$id, title, featuredImage,username}) {


    const location = useLocation()

    const getImgCls = () =>{
        if(location.pathname === '/'){
            return `rounded-xl h-[400px] w-full md:w-1/3`
        }else{
            return `rounded-xl h-[200px] w-full `
        }
    }
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full  rounded-xl p-4 '>
        <div className="flex justify-center w-full">
                    <div className="flex justify-start w-96 md:w-1/3 mb-2">
                    <img src={img} alt="" className="h-8 w-8 border-2 border-green-400 hover:scale-50 rounded-full text-center   text-white " />
                        <p className="text-white font-montserrat px-2  text-2xl">{username}</p>
                    </div>
                </div>
            <div className='w-full   mb-4 flex justify-center flex-wrap'>

                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className={getImgCls()}/>

            </div>
            <h2
            className='text-xl font-montserrat font-bold text-white text-center'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard