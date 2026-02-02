import PasswordImg from "../assets/password.svg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="w-full">
                <div className="flex h-screen overflow-hidden">
                    <div className="hidden md:flex w-1/2 relative overflow-hidden bg-white justify-center items-center">
                        <div className="absolute bg-gradient-to-t from-5% from-indigo-500/40 via-white/50 to-white/10 w-full h-full"></div>
                        <div className="relative z-50 max-w-xs mx-auto flex items-center justify-center">
                            <img src={PasswordImg} className="w-auto h-auto object-cover object-center" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 h-screen overflow-y-scroll bg-indigo-600">
                        <div className="w-full p-6 justify-center flex flex-col items-center h-full">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}