import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Button, Container, PostCard} from '../components';
import { useNavigate } from 'react-router-dom';
import images from '../assets/amigos.jpeg'
import { Navigate } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const handleClick = () =>{
        navigate('/login')
    }
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center  " >
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-2 w-full">
                            <h1 className=" text-4xl text-white font-montserrat text-transparent  hover:scale-90 transition-transform duration-300 " >   {/*textShadow: "0px 0px 10px rgba(0,0,0,0.5)"*/} {/*style={{ backgroundImage: `url(${images})`,WebkitBackgroundClip :"text",background:"cover", }}*/}
                            Publish your passions, your way
                            </h1>
                            <p className='  font-palanquin text-lg text-white mt-4'>Post anything from anywhere</p>
                        </div>
                        <Button
                        onClick = {handleClick}
                         className='flex justify-center text-center bg-[#ff8000] mt-10 px-14 py-3 text-2xl font-montserrat' >
                            {`Get Started`}
                        </Button> 
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home