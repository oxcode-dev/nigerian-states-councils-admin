import ChangePasswordForm from "../forms/ChangePasswordForm";
import ProfileForm from "../forms/ProfileForm";
import Layout from "../layout";

export default function Setting () {
    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
                </div>
                <div className="py-4">
                    <div className="tabs tabs-border border-gray-200">
                        <input type="radio" name="my_tabs_2" className="tab text-gray-500 checked:text-gray-600 checked:font-semibold" defaultChecked aria-label="Change Password" />
                        <div className="tab-content border-base-300 bg-transparent p-10">
                            <div className="w-full md:max-w-lg">
                                <ChangePasswordForm />
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_2" className="tab text-gray-500 checked:text-gray-600 checked:font-semibold" aria-label="Profile Settings" />
                        <div className="tab-content border-base-300 bg-transparent p-10">
                            <div className="w-full md:max-w-lg">
                                <ProfileForm />
                            </div>
                        </div>

                        {/* <input type="radio" name="my_tabs_2" className="tab" aria-label="Delete Account" /> */}
                        {/* <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div> */}
                    </div>
                </div>
            </main>
        </Layout>
    )
}