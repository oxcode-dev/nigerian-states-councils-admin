import { useForm } from "react-hook-form";
import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router";
import { useToastContext } from "../contexts/ToastContext";
import { post } from "../services";

type ForgotPasswordFormProp = {
    email: string
}
export default function ForgotPassword() {
    const { showToast } = useToastContext()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormProp>({
        defaultValues: {
            email: '',
        }
    });

     const handleForm = async (data: ForgotPasswordFormProp) => {
            const url = `/password/forgot`
    
            const formData = { 
                email: data?.email,
            }
    
            const response = post(url, formData);
    
            return response.then((feedback) => {
                if (feedback?.status === 201) {
                    showToast(
                        'Success', 
                        feedback?.data?.message || `Password reset instructions sent successfully`,
                        'success', true, 10
                    )
                }
            }).catch((error) => {
                console.log(error.response, 'new error')
                // setErrorBag(error?.response?.data?.message || 'An error occurred')
                showToast('Error Occurred', error?.response?.data?.message || 'An error occurred', 'error', true, 10)
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
                    <form onSubmit={handleSubmit(handleForm)} className="w-full">
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
                                {...register("email",  { required: true })}
                                required
                            />
                            {errors.email && <span className="text-red-600 text-xs font-medium">Email is required</span>}
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