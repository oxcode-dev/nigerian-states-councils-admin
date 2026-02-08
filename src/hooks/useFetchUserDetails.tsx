import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
// import { useMemo } from 'react';
import { AUTH_USER_QUERY_KEY } from '../constants';
import { useLocalStorageToken } from './useLocalStorageToken';

export const useFetchUserDetails = () => {
    const { getToken } = useLocalStorageToken()
    
    async function fetchAuthUserDetails() {
        const url = `/profile`;
    
        const response = await get(url, getToken())

        console.log('Response', response.data)

        if (!response.status || response.status !== 200) {
            throw new Error("Failed to fetch user details");
        }

        return response?.data;
    }

    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: [AUTH_USER_QUERY_KEY],
        queryFn: () => fetchAuthUserDetails(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    // const wards: WardFormProp[] = useMemo(() => {
    //     return (wardList as WardPaginationProp)?.wards || [];
    // }, [wardList]);

    // const metaData = useMemo(() => {
    //     return (wardList as WardPaginationProp)?.metadata || null;
    // }, [wardList]);

    return {
        // wards,
        // metaData,
        data,
        error,
        isFetching,
        isLoading,
    } 
}