import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useToastContext } from "../contexts/ToastContext";
import { useLocalStorageToken } from "../hooks/useLocalStorageToken";
import { post } from "../services";

type Inputs = {
  email: string
  password: string
}

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] =  useState(false);
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()

    const { showToast } = useToastContext()
    const { setToken } = useLocalStorageToken()

    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const onSubmit = async(data: Inputs) => {
        if(!data.email || !data.password) {
            return;
        }
        setIsLoading(true);
        const url = `/auth/login`
        
        const formData = {
            email: data.email,
            password: data.password,
        }

        const response = post(url, formData);

        return response.then((feedback) => {
            setToken(feedback.data.token);

            showToast(
                'Success', 
                feedback?.data?.message || `Login successful`,
                'success', true, 10
            )
            navigate('/')
        }).catch((error) => {
            showToast('Error Occurred', error?.response?.data?.message || 'An error occurred', 'error', true, 10)
        }).finally(() => {
            setIsLoading(false)
        })
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
                                className="block w-full h-12 bg-gray-100 border text-gray-500 rounded border-gray-200 my-1 p-2 focus:outline-none" 
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
                                    className="w-full h-full bg-transparent focus:outline-none text-gray-500" 
                                    type="password" 
                                    required 
                                    {...register("password", { required: true })}
                                />
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                        </div>
                        <div className="py-1 flex justify-end">
                            <Link to="/forgot-password" className="font-medium text-blue-600 text-sm">Forgot Password?</Link>
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