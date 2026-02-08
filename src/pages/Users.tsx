import { useState } from "react";
import { useFetchWards } from "../hooks/useFetchWards";
import Layout from "../layout";
import type { UserDetailsProp } from "../types";
import { useToastContext } from "../contexts/ToastContext";
import { useLocalStorageToken } from "../hooks/useLocalStorageToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, USERS_QUERY_KEY } from "../constants";
import { Spinner } from "../components/Spinner";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import WardForm from "../forms/WardForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Users() {
    const { wards,metaData, isFetching } = useFetchWards()
    const [selectedUser, setSelectedUser] = useState<UserDetailsProp | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false) 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()
    
    const queryClient = useQueryClient()

    const handleEdit = (user: UserDetailsProp) => {
        setSelectedUser(user)
        setIsFormOpen(true)
    }

    const handleAdd = () => {
        setSelectedUser(null)
        setIsFormOpen(true)
    }

    const handleDelete = (user: UserDetailsProp) => {
        setSelectedUser(user)
        setIsDeleteModalOpen(true)
    }

    const mutation = useMutation({
        mutationFn: () => handleDeleteConfirm()
    })

    const onDeleteUser = async() => {
        mutation.mutate()
    }

    const handleDeleteConfirm = async() => {

        const url = `${API_BASE_URL}/wards/${selectedUser?.id}`
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify({ 
                _id: selectedUser?.id,
            }),
        })

        const feedback = await response.json()

        if (feedback?.status === 'success') {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
            showToast('Success', feedback?.message || 'User deleted successfully', 'success', true, 10)
            setIsDeleteModalOpen(false)
        } else {
            showToast('Error Occurred', feedback?.message || 'An error occurred', 'error', true, 10)
            setIsDeleteModalOpen(false)
        }
    }
    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">Wards</h2>
                    <button onClick={() => handleAdd()} className="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
                </div>

                { isFetching && <Spinner /> }
                { !isFetching && wards?.length > 0 ? (
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                            <div className="py-2 inline-block min-w-full">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b border-gray-200">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left hidden md:table-cell"
                                                >
                                                    Geo Zone
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left hidden md:table-cell"
                                                >
                                                    Capital City
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wards?.map((ward) => (
                                                <tr key={ward._id} className="bg-gray-100 border-b border-gray-200">
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {ward.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                        {ward.state_id}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                        {ward.capital_town}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <div className="space-x-2">
                                                            <button onClick={() => handleEdit(ward)} className="w-6 h-6 bg-blue-600 text-white rounded p-1 cursor-pointer">
                                                                <PencilIcon className="size-4" />
                                                            </button>
                                                            <button onClick={() => handleDelete(ward)} className="w-6 h-6 bg-red-600 text-white rounded p-1 cursor-pointer">
                                                                <TrashIcon className="size-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <pre>{JSON.stringify(metaData, null, 2)}</pre>
                    </div>
                ): null}

                { isFormOpen && 
                    <WardForm 
                        open={isFormOpen} 
                        setOpen={setIsFormOpen} 
                        state={selectedUser}
                    />
                }
                { isDeleteModalOpen && 
                    <ConfirmDeleteModal 
                        active={isDeleteModalOpen} 
                        message="Are you sure you want to delete this user?" 
                        submitFn={onDeleteUser} 
                        onClose={() => setIsDeleteModalOpen(false)}
                    />
                }
            </main>
        </Layout>
    )
}