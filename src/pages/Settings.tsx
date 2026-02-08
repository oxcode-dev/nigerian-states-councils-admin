import { useState, type FormEvent } from "react";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ProfileForm from "../forms/ProfileForm";
import Layout from "../layout";

export default function Setting () {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setSelectedTab(Number((event.target as HTMLInputElement).value));
    };

    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
                </div>
                <div className="py-4">
                    <div className="tabs tabs-border border-gray-200">
                        <input 
                            type="radio" name="my_tabs_2" 
                            className="tab text-gray-500 checked:text-gray-600 checked:font-semibold" 
                            checked={selectedTab === 0}  
                            aria-label="Change Password" 
                            value={0} onChange={handleChange}
                        />
                        <div className="tab-content border-base-300 bg-transparent p-10">
                            {selectedTab === 0 && 
                                <div className="w-full md:max-w-lg">
                                    <ChangePasswordForm />
                                </div>
                            }
                        </div>

                        <input 
                            type="radio" name="my_tabs_2" 
                            className="tab text-gray-500 checked:text-gray-600 checked:font-semibold" 
                            checked={selectedTab === 1}  
                            aria-label="Profile Settings" 
                            value={1} onChange={handleChange}
                        />
                        <div className="tab-content border-base-300 bg-transparent p-10">
                            {selectedTab === 1 && 
                                <div className="w-full md:max-w-lg">
                                    <ProfileForm />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}