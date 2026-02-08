import { useState } from "react";
import { useToastContext } from "../contexts/ToastContext";
import { useLocalStorageToken } from "../hooks/useLocalStorageToken";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { post } from "../services";
import { AUTH_USER_QUERY_KEY } from "../constants";


type PasswordFormProp = { 
    password: string;
    confirm_password: string;
}

export default function ChangePasswordForm() {
    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()

    const [errorBag, setErrorBag] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormProp>({
        defaultValues: {
            password: '',
            confirm_password: '',
        }
    });

    const onSubmit = async (data: PasswordFormProp) => {
        if (data.password !== data.confirm_password) {
            setErrorBag('Passwords do not match')
            showToast('Error Occurred', 'Passwords do not match', 'error', true, 10)
            reset()
            setIsLoading(false)
            return;
        }
        handleForm(data)
    }

    const handleForm = async (data: PasswordFormProp) => {
        const url = `/profile/change-password`

        const response = post(url, data , getToken()) 

        return response.then((feedback) => {
            if (feedback?.status === 201) {
                queryClient.invalidateQueries({ queryKey: [AUTH_USER_QUERY_KEY] })
                setErrorBag(null)
                reset()
                setIsLoading(false)
                showToast(
                    'Success', 
                    feedback?.data?.message || `Password Changed Successfully`,
                    'success', true, 10
                )
            }
        }).catch((error) => {
            // console.log(error.response, 'new error')
            reset()
            setIsLoading(false)
            setErrorBag(error?.response?.data?.message || 'An error occurred')
            showToast('Error Occurred', error?.response?.data?.message || 'An error occurred', 'error', true, 10)
        })
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <h2 className="pb-6 py-4 text-2xl"> Change Password </h2> */}
                    { errorBag && <div className="bg-red-100 text-red-700 p-3 rounded">{errorBag}</div> }

                    <div className="my-1 pt-2">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            {...register("password",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                        {errors.password && <span className="text-red-600 text-xs font-medium">Password is required</span>}
                    </div>
                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            required
                            {...register("confirm_password",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                        {errors.confirm_password && <span className="text-red-600 text-xs font-medium">Confirm Password is required</span>}
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="transition duration-200 bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                        <span>{isLoading ? 'Processing...' : 'Change Password'}</span>
                    </button>
                </form>
            </div>
        </>
    )
}