// import { useQuery } from "@tanstack/react-query";
import Layout from "../layout";
// import axios from 'axios'

export default function Home() {
    // const fetchUsers = async () => {
    //     const { data } = await axios('/users', {
    //         withCredentials: true
    //     });
    //     return data;
    // }

    // const { data, error, isLoading} = useQuery('users', fetchUsers)
    return (
        <Layout>
            Hello World
        </Layout>
    )
}
