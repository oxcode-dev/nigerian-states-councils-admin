import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router";

export default function ForgotPassword() {
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
                    <form className="w-full">
                        <div className="py-1">
                            <h3 className="text-xl md:text-3xl text-gray-800 font-semibold"> 
                                Forgot Password
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Enter your email address below and we'll send you instructions on how to reset your password.
                            </p>
                        </div>
                        <div className="py-1">
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <input 
                                className="block w-full h-12 bg-gray-100 border text-gray-500 rounded border-gray-200 my-1 p-2 focus:outline-none"
                                type="email" 
                                required
                            />
                        </div>

                        <div className="py-1 flex justify-end">
                            <Link to="/login" className="font-medium text-blue-600 text-sm">Login</Link>
                        </div>
                        <div className="py-4 font-semibold">
                            <button className="bg-blue-600 text-white px-4 py-3 w-full rounded">
                                Send Reset Instructions 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}