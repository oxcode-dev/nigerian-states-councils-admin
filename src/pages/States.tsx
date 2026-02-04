import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Layout from "../layout";
import { useFetchStates } from "../hooks/useFetchStates";
import { Spinner } from "../components/Spinner";

export default function States() {
    const { states, isFetching, error } = useFetchStates()
    console.log(states, isFetching, error);

    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">States</h2>
                    <button className="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
                </div>

                { isFetching && <Spinner /> }

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b border-gray-200">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Geo Zone
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {states?.map((state) => (
                                            <tr key={state._id} className="bg-gray-100 border-b border-gray-200">
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {state.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {state.geoZone}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {state.price}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <div className="space-x-2">
                                                        <button className="w-6 h-6 bg-blue-600 text-white rounded p-1">
                                                            <PencilIcon className="size-4" />
                                                        </button>
                                                        <button className="w-6 h-6 bg-red-600 text-white rounded p-1">
                                                            <TrashIcon className="size-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </Layout>
    )
}