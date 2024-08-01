import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import img from '../assets/profile.png'

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const [isAuthor, setIsAuthor] = useState(false); // Local state to track if the user is the author

    // Log user data and post data for debugging purposes
    useEffect(() => {
        console.log("User data:", userData);
        console.log("Post data:", post);
    }, [userData, post]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    console.log("Fetched post:", fetchedPost);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (post && userData) {
            setIsAuthor(post.userid === userData.$id);
            console.log("Is author:", post.userid === userData.$id);
        }
    }, [post, userData]);

    const deletePost = () => {
        if (post && post.featuredImage) {
            console.log("Deleting file with ID:", post.featuredImage);
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        } else {
            console.error("Cannot delete file. Missing fileId.");
        }
    };
    // console.log(post.username)

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex justify-center w-full">
                    <div className="flex justify-start w-96">
                    <img src={img} alt="" className="h-8 w-8 border-2 border-green-400 hover:scale-50 rounded-full text-center   text-white " />
                        <p className="text-white font-montserrat px-2  text-2xl">{post.username}</p>
                    </div>
                </div>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-96"
                    />
                    {isAuthor && (
                        <div className="absolute -top-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                <div className="w-full mb-6 flex justify-center">
                    <h1 className="text-2xl font-montserrat text-white">{post.title}</h1>
                </div>
                <div className="w-full flex justify-center ">
                    <p className="text-center text-white font-montserrat">{parse(post.content)}</p>
                </div>
                </div>
            </Container>
        </div>
    ) : null;
}
