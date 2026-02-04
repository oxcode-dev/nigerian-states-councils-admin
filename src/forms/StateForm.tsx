'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Modal from '../components/Modal';

type StateFormProp = {
    name: string
    geo_zone: string
    code: string
    capital_city: string
    slogan: string
    description: string
    creation_year: number
    created_at: string
    _id?: string | null
};


type FormProp = {
    state: StateFormProp | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const StateForm = ({ open, setOpen, state } : FormProp) => {

    const [errorBag, setErrorBag] = useState({})

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: StateFormProp) => handleForm(data)
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StateFormProp>({
        defaultValues: {
            name: state?.name || '',
            geo_zone: state?.geo_zone || '',
            code: state?.code || '',
            capital_city: state?.capital_city || '',
            slogan: state?.slogan || '',
            description: state?.description || '',
            creation_year: state?.creation_year || 0,
        }
    });

    const onSubmit = async(data: StateFormProp) => {
        mutation.mutate(data)
    }

    const handleForm = async (data: StateFormProp) => {
        const getTokenResponse = await fetch('/api/fetch-token')

        const getToken = await getTokenResponse.json()

        if(getToken && !getToken?.token){
            return alert('Unauthenticated User')
        }

        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/states${data._id ? '/' + data._id : ''}`

        const response = await fetch(url, {
            method: data._id ? 'PUT' : 'POST',
            headers: { 
                Authorization: `Bearer ${getToken.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
            body: JSON.stringify({ 
                name: data?.name,
                geo_zone: data?.geo_zone,
                code: data?.code,
                capital_city: data?.capital_city,
                slogan: data?.slogan,
                description: data?.description,
                creation_year: data?.creation_year,
            }),
        })

        const feedback = await response.json()

        if (feedback?.success) {
            queryClient.invalidateQueries({ queryKey: ['list_address'] })
            setErrorBag({})
            setOpen(false)
        } else {
            setErrorBag(feedback?.data)
        }

    }

    return (
        <Modal show={open} onClose={() => setOpen(false)} >
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 pb-4 border-b border-gray-200">
                    { state && state._id ? 'Edit State' : 'Add New State' }
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="name">Name</label>
                        <input type="text" {...register("name",  { required: true })}  placeholder="Name" className="input w-full bg-white border border-gray-300" />
                        {errors.name && <span className="text-red-600 text-xs font-medium">Name is required</span>}
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="geo_zone">Geo Zone</label>
                        <input type="text" {...register("geo_zone",  { required: true })} placeholder="Geo Zone" className="input w-full bg-white border border-gray-300" />
                        {errors.geo_zone && <span className="text-red-600 text-xs font-medium">Geo Zone is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="code">Code</label>
                        <input type="text" {...register("code",  { required: true })} placeholder="Code" className="input w-full bg-white border border-gray-300" />
                        {errors.code && <span className="text-red-600 text-xs font-medium">Code is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="capital_city">Capital City</label>
                        <input id="capital_city" type="text" {...register("capital_city",  { required: true })} placeholder="Capital City" className="input w-full bg-white border border-gray-300" />
                        {errors.capital_city && <span className="text-red-600 text-xs font-medium">Capital City is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="slogan">Slogan</label>
                        <input id="slogan" type="text" {...register("slogan",  { required: true })} placeholder="Slogan" className="input w-full bg-white border border-gray-300" />
                        {errors.slogan && <span className="text-red-600 text-xs font-medium">Slogan is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="description">Description</label>
                        <input id="description" type="text" {...register("description",  { required: true })} placeholder="Description" className="input w-full bg-white border border-gray-300" />
                        {errors.description && <span className="text-red-600 text-xs font-medium">Description is required</span>}
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-sm font-medium text-gray-800" htmlFor="creation_year">Creation Year</label>
                        <input id="creation_year" type="text" {...register("creation_year",  { required: true })} placeholder="Creation Year" className="input w-full bg-white border border-gray-300" />
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

export default StateForm