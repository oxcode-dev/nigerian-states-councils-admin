export async function get(url: string, token: string = '') {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        headers: { 
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return await res//.json();
}

export async function post(url: string, data={}, token: string = '') {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        method: 'POST',
        headers: {
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
        // console.log("Failed to fetch posts");
    }
    return res//.json();
}

export async function postFile(url: string, data={}, token: string = '') {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        method: 'POST',
        headers: { 
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Accept': 'application/json',
            // Accept: '*/*',
            'Content-Type' : 'multipart/form-data',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
        // console.log("Failed to fetch posts");
    }
    return res//.json();
}

export async function put(url: string, data={}, token: string = '') {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        method: 'PUT',
        headers: { 
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
        // console.log("Failed to fetch posts");
    }
    return res//.json();
}

export async function deleteRequest(url: string, token: string = '') {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`, {
        method: 'DELETE',
        headers: { 
            Authorization: `${token ? 'Bearer ' + token : ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
        // console.log("Failed to fetch posts");
    }
    return res//.json();
}