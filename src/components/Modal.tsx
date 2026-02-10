import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

type MaxWidth =
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'

interface ModalProps {
    show?: boolean
    closeable?: boolean
    maxWidth?: MaxWidth
    onClose?: () => void
    children?: React.ReactNode
}

export default function Modal({
    show = false,
    closeable = true,
    maxWidth = '2xl',
    onClose,
    children,
}: ModalProps) {
    // Lock body scroll
    useEffect(() => {
        if (show) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [show])

    // ESC key handling
    useEffect(() => {
        const handleKeyDown = (e: React.KeyboardEvent | KeyboardEventInit) => {
            if (e.key === 'Escape' && show && closeable) {
                onClose?.()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [show, closeable, onClose])

    const maxWidthClass = useMemo(() => {
        return {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
        }[maxWidth]
    }, [maxWidth])

    const close = () => {
        if (closeable) {
            onClose?.()
        }
    }

    if (!show) return null

    return createPortal(
        <div
            className="fixed inset-0 z-[1000] overflow-y-auto px-4 py-6 sm:px-0"
            aria-modal="true"
            role="dialog"
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-500 opacity-50 transition-opacity duration-200"
                onClick={close}
            />

            {/* Modal */}
            <div className="flex min-h-full flex-col justify-center">
                <div
                    className={`mb-8 mt-6 sm:mt-12 w-full sm:mx-auto bg-white rounded-lg shadow-xl transform transition-all
                        duration-300 ease-out
                        opacity-100 translate-y-0 sm:scale-100
                        ${maxWidthClass}`}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
