export const useLocalStorageToken = () => {
    const getToken = () => {
        return localStorage.getItem('authToken') || null;
    };

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    };

    const removeToken = () => {
        localStorage.removeItem('authToken');
    };

    return { getToken, setToken, removeToken };
}