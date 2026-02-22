import NoDataImg from "../assets/no-data.svg";

export function EmptyState({ message }: { message: string | null }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-10 py-20">
            <div className="size-28 md:size-40 flex items-center justify-center">
                <img src={NoDataImg} className="w-auto h-auto object-cover object-center" />
            </div> 
            <p>
                { message || 'No Data' }
            </p>
        </div>
    )
}