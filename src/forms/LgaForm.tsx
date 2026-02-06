'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Modal from '../components/Modal';
import { LGAS_QUERY_KEY } from '../constants';
import { useToastContext } from '../contexts/ToastContext';
import type { LgaFormProp } from '../types';
import { useLocalStorageToken } from '../hooks/useLocalStorageToken';
import { useFetchStates } from '../hooks/useFetchStates';
import { post, put } from '../services';


type FormProp = {
    state: LgaFormProp | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LgaForm = ({ open, setOpen, state } : FormProp) => {

    const { showToast } = useToastContext()
    const { getToken } = useLocalStorageToken()
    const { states } = useFetchStates()

    const [errorBag, setErrorBag] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: LgaFormProp) => handleForm(data)
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LgaFormProp>({
        defaultValues: {
            name: state?.name || '',
            state_id: state?.state_id || '',
            code: state?.code || '',
            capital_town: state?.capital_town || '',
            slogan: state?.slogan || '',
            description: state?.description || '',
            creation_year: state?.creation_year || 0,
            _id: state?._id || null,
        }
    });

    const onSubmit = async(data: LgaFormProp) => {
        mutation.mutate(data)
    }

    const handleForm = async (data: LgaFormProp) => {

        const url = `/lgas${data._id ? '/' + data._id : ''}`

        const formData = {
            name: data?.name,
            state_id: data?.state_id,
            code: data?.code,
            capital_town: data?.capital_town,
            slogan: data?.slogan,
            description: data?.description,
            creation_year: data?.creation_year,
        }

        const response = data._id ? 
            put(url, formData , getToken()) :
            post(url, formData , getToken());

        return response.then((feedback) => {
            if (feedback?.status === 201) {
                queryClient.invalidateQueries({ queryKey: [LGAS_QUERY_KEY] })
                setErrorBag(null)
                showToast(
                    'Success', 
                    feedback?.data?.message || `State ${data._id ? 'updated' : 'created'} successfully`,
                    'success', true, 10
                )
                setOpen(false)
            }
        }).catch((error) => {
            console.log(error.response, 'new error')
            setErrorBag(error?.response?.data?.message || 'An error occurred')
            showToast('Error Occurred', error?.response?.data?.message || 'An error occurred', 'error', true, 10)
        })
    }

    return (
        <Modal show={open} onClose={() => setOpen(false)} >
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 pb-4 border-b border-gray-200">
                    { state && state._id ? 'Edit State' : 'Add New State' }
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
                    { errorBag && <div className="bg-red-100 text-red-700 p-3 rounded">{errorBag}</div> }

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="name">Name</label>
                        <input type="text" {...register("name",  { required: true })} placeholder="Name" className="input w-full bg-white border border-gray-300" />
                        {errors.name && <span className="text-red-600 text-xs font-medium">Name is required</span>}
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="state_id">State</label>
                        <select {...register("state_id",  { required: true })} className="select select-bordered w-full bg-white border-gray-300">
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state._id} value={state._id}>{state.name}</option>
                            ))}
                        </select>
                        {errors.state_id && <span className="text-red-600 text-xs font-medium">State is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="code">Code</label>
                        <input type="text" {...register("code",  { required: true })} placeholder="Code" className="input w-full bg-white border border-gray-300" />
                        {errors.code && <span className="text-red-600 text-xs font-medium">Code is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="capital_city">Capital Town</label>
                        <input id="capital_town" type="text" {...register("capital_town",  { required: true })} placeholder="Capital City" className="input w-full bg-white border border-gray-300" />
                        {errors.capital_town && <span className="text-red-600 text-xs font-medium">Capital Town is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="slogan">Slogan</label>
                        <input id="slogan" type="text" {...register("slogan",  { required: true })} placeholder="Slogan" className="input w-full bg-white border border-gray-300" />
                        {errors.slogan && <span className="text-red-600 text-xs font-medium">Slogan is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="description">Description</label>
                        <textarea id="description" {...register("description",  { required: true })} placeholder="Description" className="textarea w-full bg-white border border-gray-300" />
                        {errors.description && <span className="text-red-600 text-xs font-medium">Description is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="creation_year">Creation Year</label>
                        <select {...register("creation_year",  { required: true })} className="select select-bordered w-full bg-white border-gray-300">
                            <option value="">Select Creation Year</option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {errors.creation_year && <span className="text-red-600 text-xs font-medium">Creation Year is required</span>}
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

export default LgaForm