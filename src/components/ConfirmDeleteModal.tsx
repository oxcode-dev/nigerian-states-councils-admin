import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef } from "react";

type ConfirmDeleteModalProps = {
  active?: boolean;
  isLoading?: boolean;
  message?: string | null;
  submitFn: () => void;
  onClose: (value: false) => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  active = true,
  isLoading = false,
  message = "Are you want to delete this item?",
  submitFn,
  onClose,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        if (active) onClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, onClose]);

  return (
    <div ref={targetRef}>
      <div
        className={`fixed z-[500] bottom-4 right-2 transition-transform duration-[0.8s] ease-[ease-in-out]
          ${active ? "translate-y-[-10%]" : "translate-y-[130%]"}`}
      >
        <div className="relative block w-full max-w-lg rounded-lg bg-red-500 px-4 py-2 text-white">
          {/* Icon */}
          <div className="absolute top-4 left-4">
            <ExclamationCircleIcon className="h-8 w-8" />
          </div>

          {/* Content */}
          <div className="ml-10 pl-2 mr-12">
            <p className="block text-sm font-medium leading-snug tracking-normal text-white antialiased">
              {message}
            </p>

            { !isLoading ? (
              <div className="mt-2 space-x-2">
                <button
                  className="p-2 py-1 border border-white rounded-md text-sm bg-white text-red-600 cursor-pointer"
                  onClick={submitFn}
                >
                  Yes
                </button>

                <button
                  className="p-2 py-1 border border-white rounded-md text-sm cursor-pointer"
                  onClick={() => onClose(false)}
                >
                  No
                </button>
              </div>
            ) : (
              <div className="mt-2 space-x-2">
                Loading...
              </div>
            )}
          </div>

          {/* Close button */}
          <div className="absolute top-3 right-3 w-max rounded-lg transition-all hover:text-red-500 hover:bg-white hover:bg-opacity-20">
            <button
              onClick={() => onClose(false)}
              className="w-max rounded-lg p-1"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
