import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [errors, setErrors] = useState("")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async(data) => {
        setErrors("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(data));
                navigate("/")
            }
        } catch (errors) {
            setErrors(errors)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full min-h-screen  bg-gradient-to-t from-[#2f454f] to-[#bc382e]
'
    >  {/*via-[#388d80]  to-[#ff8000]*/}
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 bg-white/5  bg-blur-sm bg-opacity-50 backdrop-filter backdrop-blur-3xl
`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight font-montserrat">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60 font-montserrat">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline font-montserrat"
                    >
                        Sign Up
                    </Link>
        </p>
        {errors ? <p className="text-red-600 mt-8 text-center">{errors}</p>:null}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                <div className="relative">
                            <Input
                                label="Password: "
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 pt-6"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                <Button
                type="submit"
                className="w-full font-montserrat"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login