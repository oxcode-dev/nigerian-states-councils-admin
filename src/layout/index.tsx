
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";

type PropType = {
    children: React.ReactNode
}

export default function AppLayout ({ children }: PropType) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
                <div className={`${isOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Sidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
                
                {isOpen ? <div role="button" onClick={() => setIsOpen(false)} className="fixed md:hidden bg-gray-500/50 w-full h-full z-20"></div> : null }
                
                <div className="p-4 border-b border-gray-200 md:hidden fixed top-0 w-full bg-white">
                    <div className="flex justify-between items-center">
                        <a>
                            <span className="text-xl font-bold text-slate-800 tracking-tight">Socials</span>
                        </a>

                        <a href="#" type="button" onClick={() => setIsOpen(true)}>
                            <Bars3Icon className="size-5" />
                        </a>
                    </div>
                </div>

                <main className="w-full md:pl-64 text-gray-500 pt-16 md:pt-0">
                    <div className="p-2 md:p-4">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}