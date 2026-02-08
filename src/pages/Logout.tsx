
import { useEffect } from 'react'
import { deleteRequest } from '../services'
import { useLocalStorageToken } from '../hooks/useLocalStorageToken'
import { API_BASE_URL } from '../constants'
import axios from 'axios'

const Logout = () => {
    const { getToken, removeToken } = useLocalStorageToken()

    const handleLogout = async() => {
        await deleteRequest('/auth/logout', getToken())

        await axios.post(`${API_BASE_URL}/auth/logout`)

        removeToken()
      
        window.location.href = '/login'
    }

    useEffect(() => {
        handleLogout()
    }, [])

    return (
        <div className="fixed z-[1000] h-screen w-full bg-white top-0 left-0 items-center self-center justify-center flex ">
            <div className="animate animate-bounce">
                <svg className="size-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 .152-.26.288-.624.384a2.25 2.25 0 01-1.152 0A1.993 1.993 0 0113.5 12z" />
                </svg>
            </div>
            <div className="text-gray-500 text-lg mt-4">Logging out...</div>
        </div>
    )
}

export default Logout;