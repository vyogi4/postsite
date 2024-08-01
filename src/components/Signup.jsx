import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const create = async (data) => {
        setError(""); // Clear previous errors
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center">

            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 bg-transparent   bg-blur-sm bg-opacity-50 backdrop-filter backdrop-blur-lg
            bg-gradient-to-t from-[#2f454f] to-[#bc382e]
            
">
                <div className="mb-2 flex justify-center items-center">
                    <span className="inline-block w-full max-w-[100px] ">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight font-montserrat">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 font-montserrat">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-white transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                        
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address"
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
                        
                        <Button type="submit" className="w-full font-montserrat">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
