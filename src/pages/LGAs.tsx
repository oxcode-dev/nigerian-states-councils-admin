import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Layout from "../layout";
import { Spinner } from "../components/Spinner";
import { useFetchLocalGovt } from "../hooks/useFetchLocalGovt";
import type { LgaFormProp } from "../types";
import { useState } from "react";
import { useToastContext } from "../contexts/ToastContext";
import { useLocalStorageToken } from "../hooks/useLocalStorageToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LGAS_QUERY_KEY } from "../constants";
import LgaForm from "../forms/LgaForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { deleteRequest } from "../services";

export default function LocalGovts() {
    const { isFetching, lgas, metaData, setPage } = useFetchLocalGovt();
    const [selectedLga, setSelectedLga] = useState<LgaFormProp | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false) 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()
    
    const queryClient = useQueryClient()

    const handleEdit = (lga: LgaFormProp) => {
        setSelectedLga(lga)
        setIsFormOpen(true)
    }

    const handleAdd = () => {
        setSelectedLga(null)
        setIsFormOpen(true)
    }

    const handleDelete = (lga: LgaFormProp) => {
        setSelectedLga(lga)
        setIsDeleteModalOpen(true)
    }

    const mutation = useMutation({
        mutationFn: () => handleDeleteConfirm()
    })

    const onDeleteLga = async() => {
        mutation.mutate()
    }

    const handleDeleteConfirm = async() => {

        const url = `/lgas/${selectedLga?._id}`
        
        const response = deleteRequest(url, getToken())

        // console.log(response, 'Delete')

        return response.then((feedback) => {
            if (feedback?.status === 201) {
                setIsDeleteModalOpen(false)
                queryClient.invalidateQueries({ queryKey: [LGAS_QUERY_KEY] })
                showToast(
                    'Success', 
                    feedback?.data?.message || `Local Govt deleted successfully`,
                    'success', true, 10
                )
            }
        }).catch((error) => {
            setIsDeleteModalOpen(false)
            showToast('Error Occurred', error?.response?.data?.message || 'An error occurred', 'error', true, 10)
        })
    }

    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">Local Government Areas</h2>
                    <button onClick={() => handleAdd()} className="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
                </div>

                { isFetching && <Spinner /> }
                { !isFetching && lgas?.length > 0 ? (
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
                                                    State
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left hidden md:table-cell"
                                                >
                                                    Capital Town
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lgas?.map((lga) => (
                                                <tr key={lga._id} className="bg-gray-100 border-b border-gray-200">
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {lga.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                        {lga.state?.name || 'Unknown State'}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                        {lga.capital_town}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <div className="space-x-2">
                                                            <button onClick={() => handleEdit(lga)} className="w-6 h-6 bg-blue-600 text-white rounded p-1 cursor-pointer">
                                                                <PencilIcon className="size-4" />
                                                            </button>
                                                            <button onClick={() => handleDelete(lga)} className="w-6 h-6 bg-red-600 text-white rounded p-1 cursor-pointer">
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
                            {/* <pre>{JSON.stringify(metaData, null, 2)}</pre> */}
                            <div className="w-full mx-auto flex justify-center my-4 mt-6">
                                <div className="join">
                                    <button 
                                        disabled={metaData?.page === 1} 
                                        onClick={() => setPage(metaData?.page - 1)} 
                                        className="join-item btn bg-gray-200 text-gray-500 border border-gray-200 disabled:opacity-50"
                                    >
                                        <ChevronLeftIcon className="size-6" />
                                    </button>
                                    <div className="join-item font-light btn bg-gray-200 text-gray-500 border border-gray-200">
                                        Page <b className="font-bold text-md">{metaData?.page || 0}</b> of {metaData?.totalPages || 0}
                                    </div>
                                    <button 
                                        disabled={metaData?.page === metaData?.totalPages}
                                        onClick={() => setPage(1 + metaData?.page || 0)} 
                                        className="join-item btn bg-gray-200 text-gray-500 border border-gray-200 disabled:opacity-50"
                                    >
                                        <ChevronRightIcon className="size-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ): null}

                { isFormOpen && 
                    <LgaForm
                        open={isFormOpen} 
                        setOpen={setIsFormOpen} 
                        state={selectedLga}
                    />
                }
                { isDeleteModalOpen && 
                    <ConfirmDeleteModal 
                        active={isDeleteModalOpen} 
                        message="Are you sure you want to delete this lga?" 
                        submitFn={onDeleteLga} 
                        onClose={() => setIsDeleteModalOpen(false)}
                    />
                }
            </main>
        </Layout>
    )
}