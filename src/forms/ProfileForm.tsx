export default function ProfileForm() {
    return (
        <>
            <div>
                <form>
                    {/* <h2 className="pb-6 py-4 text-2xl"> Change Password </h2> */}
                    <div className="my-1 pt-2">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            First Name
                        </label>
                        <input
                            type="text"
                            required
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                    </div>
                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Last Name
                        </label>
                        <input
                            type="text"
                            required
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                    </div>
                    <div className="my-1">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                        <span>Update Profile</span>
                    </button>
                </form>
            </div>
        </>
    )
}