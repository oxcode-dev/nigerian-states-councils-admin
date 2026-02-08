import { useState } from "react"
import { useToastContext } from "../contexts/ToastContext"
import { useLocalStorageToken } from "../hooks/useLocalStorageToken"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { UserDetailsProp } from "../types"
import { useFetchUserDetails } from "../hooks/useFetchUserDetails"
import { put } from "../services"
import { AUTH_USER_QUERY_KEY } from "../constants"

export default function ProfileForm() {
    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()
    const { user } = useFetchUserDetails();
    
    const [errorBag, setErrorBag] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: UserDetailsProp) => handleForm(data)
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserDetailsProp>({
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            id: user?.id || ''
        }
    });

    const onSubmit = async(data: UserDetailsProp) => {
        mutation.mutate(data)
    }

    const handleForm = async (data: UserDetailsProp) => {
        const url = `/profile`

        const response = put(url, data , getToken()) 

        return response.then((feedback) => {
            if (feedback?.status === 201) {
                queryClient.invalidateQueries({ queryKey: [AUTH_USER_QUERY_KEY] })
                setErrorBag(null)
                showToast(
                    'Success', 
                    feedback?.data?.message || `Profile Updated Successfully`,
                    'success', true, 10
                )
            }
        }).catch((error) => {
            // console.log(error.response, 'new error')
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
                            First Name
                        </label>
                        <input
                            type="text"
                            required
                            {...register("first_name",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                        {errors.first_name && <span className="text-red-600 text-xs font-medium">First Name is required</span>}
                    </div>
                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Last Name
                        </label>
                        <input
                            type="text"
                            required
                            {...register("last_name",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                        {errors.last_name && <span className="text-red-600 text-xs font-medium">Last Name is required</span>}
                    </div>
                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            {...register("email",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                        {errors.email && <span className="text-red-600 text-xs font-medium">Email is required</span>}
                    </div>
                    <button
                        type="submit"
                        className="transition duration-200 bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                        <span>Update Profile</span>
                    </button>
                </form>
            </div>
        </>
    )
}