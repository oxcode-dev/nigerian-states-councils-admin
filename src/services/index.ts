import axios from "axios";

export async function get(url: string, token: string | null = '') {
    const res = await axios(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        headers: { 
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return res
}

export async function post(url: string, data={}, token: string | null = '') {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, data, {
        headers: {
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // body: JSON.stringify(data),
    });

    if (!res.status || res.status !== 201) {
        throw new Error("Failed to post data");
    }
    return res//.json();
}

export async function postFile(url: string, data={}, token: string | null = '') {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, data, {
        headers: {
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!res.status || res.status !== 201) {
        throw new Error("Failed to post data");
    }
    return res;
}

export async function put(url: string, data={}, token: string | null = '') {
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, data, {
        headers: {
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!res.status || res.status !== 201) {
        throw new Error("Failed to update data");
    }
    return res;
}

export async function deleteRequest(url: string, token: string | null = '') {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        headers: {
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!res.status || res.status !== 201) {
        throw new Error("Failed to delete data");
    }
    return res;
}

axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) { 
        alert('Login Session Expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});