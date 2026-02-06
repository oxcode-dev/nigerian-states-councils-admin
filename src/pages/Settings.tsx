import Layout from "../layout";

export default function Setting () {
    return (
        <Layout>
            <main className="rounded-lg bg-white text-slate-500 px-4 py-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
                </div>
                <div className="py-4">
                    <div className="tabs tabs-border">
                        <input type="radio" name="my_tabs_2" className="tab" defaultChecked aria-label="Change Password" />
                        <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>

                        <input type="radio" name="my_tabs_2" className="tab" aria-label="Profile Settings" />
                        <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>

                        {/* <input type="radio" name="my_tabs_2" className="tab" aria-label="Delete Account" /> */}
                        {/* <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div> */}
                    </div>
                </div>
            </main>
        </Layout>
    )
}