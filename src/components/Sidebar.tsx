import { XMarkIcon } from "@heroicons/react/24/outline"
import type React from "react"
import { Link } from "react-router-dom"
import { useFetchUserDetails } from "../hooks/useFetchUserDetails"

const navItems = [
    {
        label: "Home",
        link: '/',
        active: true,
    },
    {
        label: "States",
        link: '/states',
        active: true,
    },
    {
        label: "Local Governments",
        link: '/local-governments',
        active: true,
    },
    // {
    //     label: "Wards",
    //     link: '/wards',
    //     active: true,
    // },
    {
        label: "Settings",
        link: '/settings',
        active: true,
    },
    {
        label: "Log Out",
        // icon: ArrowRightStartOnRectangleIcon,
        link: '#',
        active: true,
    }
]

type PropType = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
}

export default function Sidebar ({ isOpen, setIsOpen}: PropType) {
    const {data: userDetails} = useFetchUserDetails();
    console.log(userDetails?.user);
    return (
        <aside className="w-64 fixed top-0 left-0 bottom-0 z-50">
            <div className="w-full bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full">
                <div className="px-3 pt-6 pb-2 flex items-center space-x-3 justify-between">
                    <span className="text-xl font-bold text-slate-800 tracking-tight">
                        Nigerian States & Councils Admin
                    </span>
                    <a href="#" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <XMarkIcon className="size-6" />
                    </a>
                </div>

                <nav className="flex-1 flex flex-col overflow-y-auto py-4">
                    {
                        navItems.map((nav, key) => (
                            <Link to={nav.link} key={key} className="inline-flex text-base space-x-3 items-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 py-3 px-3">
                                {/* <nav.icon className="size-5" /> */}
                                <span>{nav.label}</span>
                            </Link>
                        ))
                    }
                </nav>

                <div>
                    <div className="pb-4 px-2">
                        <div className="inline-flex items-center justify-between w-full">
                            <div className="space-x-3 flex items-center">
                                <span className="bg-gray-200 size-8 p-2 text-sm text-gray-600 rounded-full inline-flex items-center justify-center">OS</span>
                                <p className="inline-flex flex-col text-sm font-medium text-gray-600 -space-y-0.5">
                                    <span>Osemeke Samuel</span>
                                    <span className="font-light text-xs">@oxcode__</span>
                                </p>
                            </div>
                            {/* <p>
                                <ArrowRightIcon className="size-5" />
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}