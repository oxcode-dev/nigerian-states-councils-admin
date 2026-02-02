'use client';

import { useMemo } from "react";
import { useToastContext } from "../contexts/ToastContext";
import { XMarkIcon } from "@heroicons/react/20/solid";

const ToastNotification = () => {
    const { toast, hideToast } = useToastContext()
    const alertType = useMemo(() => {
        if(toast.type === 'error') return 'alert-error'
        if(toast.type === 'warning') return 'alert-warning'
        return 'alert-success';
    }, [toast.type])

    return (
        <>
            { toast.show ? (
                <div className="toast toast-top toast-end z-[1000] w-full sm:max-w-xs">
                    <div role="alert" className={`${alertType} alert alert-vertical sm:alert-horizontal flex justify-between`}>
                        <div className="text-white">
                            <h3 className="font-bold">{toast?.heading}</h3>
                            <div className="text-xs">{toast?.message}</div>
                        </div>
                        <button onClick={() => hideToast()} className="btn btn-sm bg-transparent border-0">
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>
                </div>
            ) : null }
        </>
    )
}

export default ToastNotification;