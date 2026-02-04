import React, { useEffect, useRef } from "react";

type ConfirmDeleteProps = {
  active?: boolean;
  message?: string | null;
  submitFn: () => void;
  onClose: (value: false) => void;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  active = true,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="ml-10 pl-2 mr-12">
            <p className="block text-sm font-medium leading-snug tracking-normal text-white antialiased">
              {message}
            </p>

            <div className="mt-2 space-x-2">
              <button
                className="p-2 py-1 border border-white rounded-md text-sm bg-white text-red-600"
                onClick={submitFn}
              >
                Yes
              </button>

              <button
                className="p-2 py-1 border border-white rounded-md text-sm"
                onClick={() => onClose(false)}
              >
                No
              </button>
            </div>
          </div>

          {/* Close button */}
          <div className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20">
            <button
              onClick={() => onClose(false)}
              className="w-max rounded-lg p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
