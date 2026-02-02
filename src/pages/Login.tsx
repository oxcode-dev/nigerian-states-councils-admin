import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useState } from "react";

type Inputs = {
  email: string
  password: string
}

export default function Login() {
    const [isLoading, setIsLoading] =  useState(false);
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()

    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const onSubmit = async(data: Inputs) => {
        if(!data.email || !data.password) {
            // setIsSuccess(false)
            // setStatusMessage('Fill all the input.')
            return;
        }

        try {
            setIsLoading(true);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, {
                email: data.email,
                password: data.password,
            }, config)
            console.log(response.data);

            // localStorage.setItem('token', response.data.token)

            // setIsSuccess(true)
            // setStatusMessage('Login successful');
            // navigate('/admin')

        } catch (error) {
            console.log(error, error?.response?.data);
            // if(error.response) {
            //     setIsSuccess(false)
            //     setStatusMessage(error?.response?.data?.message || "An error occurred")
            // } else if(error.request) {
            //     console.error(error.request)
            // } else {
            //     console.error('Error ', error.message)
            // }
            
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout>
            <div className="w-full max-w-sm md:max-w-sm bg-white rounded-lg p-6 shadow-lg">
                <div className="w-40 md:hidden mb-12">
                    <a href="/" className="">
                        <div>
                            <img src="/assets/img/logo.png" className="w-full h-full object-contain" />
                        </div>
                    </a>
                </div>
                <div className="w-full md:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="py-1">
                            <h3 className="text-xl md:text-3xl text-gray-800 font-semibold"> 
                                Log in 
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Welcome back! Please enter your details.
                            </p>
                        </div>
                        <div className="py-1">
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <input
                                className="block w-full h-12 bg-gray-100 border rounded border-gray-200 my-1 p-2 focus:outline-none" 
                                type="email" 
                                required
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>
                        <div className="py-1">
                            <label className="text-sm font-medium text-gray-500">Password</label>
                            <div className="block w-full h-12 bg-gray-100 border rounded border-gray-200 my-1 p-2 focus:outline-none relative">
                                <input 
                                    className="w-full h-full bg-transparent focus:outline-none" 
                                    type="password" 
                                    required 
                                    {...register("password", { required: true })}
                                />
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                        </div>
                        <div className="py-1 flex justify-end">
                            <Link to="/forgot-password" className="font-medium text-blue-600">Forgot Password?</Link>
                        </div>
                        <div className="py-4 font-semibold">
                            <button disabled={isLoading} className="bg-blue-600 text-white px-4 py-3 w-full rounded">
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}