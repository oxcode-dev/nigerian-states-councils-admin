// import NoDataImg from "../assets/no-data.svg";

export function EmptyState({ message }: { message: string }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M8.832 21h8.337c1.657 0 3-1.343 3-3V5c0-1.657-1.343-3-3-3H8.832c-1.657 0-3 1.343-3 3v13c0 1.657 1.343 3 3 3z" />
                </svg>

                { message || 'No Data' }
            </div> 
        </div>
    )
}