import { useState } from "react"
import { useToastContext } from "../contexts/ToastContext"
import { useLocalStorageToken } from "../hooks/useLocalStorageToken"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { UserDetailsProp } from "../types"
import { post } from "../services"
import { USERS_QUERY_KEY } from "../constants"
import Modal from "../components/Modal"

type FormProp = {
    user: UserDetailsProp | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserForm({ open, setOpen, user } : FormProp) {

    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()

    // const [isLoading, setIsLoading] = useState(false)
    
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
            isAdmin: user?.isAdmin || false,
            id: user?.id || ''
        }
    });

    const onSubmit = async(data: UserDetailsProp) => {
        mutation.mutate(data)
    }

    const handleForm = async (data: UserDetailsProp) => {
        const url = `/users`

        const response = post(url, data , getToken()) 

        return response.then((feedback) => {
            if (feedback?.status === 201) {
                queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
                setErrorBag(null)
                setOpen(false)
                showToast(
                    'Success', 
                    feedback?.data?.message || `User Created Successfully`,
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
        <Modal show={open} onClose={() => setOpen(false)}>
            <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-lg font-medium text-gray-900 pb-4 border-b border-gray-200">
                        { user && user.id ? 'Edit User' : 'Add New User' }
                    </h3>
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

                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Admin Status
                        </label>
                        {/* <input
                            type="email"
                            required
                            {...register("email",  { required: true })}
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        /> */}
                        <input 
                            type="checkbox" 
                            defaultChecked={user?.isAdmin || false} 
                            {...register("isAdmin",  { required: false })}
                            className="toggle toggle-md !border !border-gray-300"
                        />
                        {/* {errors.isAdmin && <span className="text-red-600 text-xs font-medium">Admin status is required</span>} */}
                    </div>

                    <div className="py-2 pt-6 space-x-3">
                        <button onClick={() => setOpen(false)} type="button" className="btn btn-md bg-gray-200 border-gray-300 text-gray-500 rounded-md">
                            Cancel
                        </button>
                        <button disabled={mutation.isPending} type="submit" className="btn !bg-green-600 active:bg-green-600 border-green-600 text-white btn-md rounded-md">
                            { mutation.isPending && <span className="loading loading-spinner loading-sm text-white"></span> }
                            <span>{ mutation.isPending ? 'Loading...' : 'Save'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}