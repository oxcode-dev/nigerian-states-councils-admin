import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo, useState } from 'react';
import { AUTH_USER_QUERY_KEY } from '../constants';
import { useLocalStorageToken } from './useLocalStorageToken';
import type { UserDetailsProp, userFetchResponseProp } from '../types';

export const useFetchUsers = () => {
    const [page, setPage] = useState(1);

    const { getToken } = useLocalStorageToken()
    
    async function fetchAuthUserDetails() {
        const url = `/users?page=${page}`;
    
        const response = await get(url, getToken())

        if (!response.status || response.status !== 200) {
            throw new Error("Failed to fetch user details");
        }

        return response?.data;
    }

    const { data: userResponse, error, isLoading, isFetching } = useQuery({
        queryKey: [AUTH_USER_QUERY_KEY],
        queryFn: () => fetchAuthUserDetails(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const user: UserDetailsProp = useMemo(() => {
        return (userResponse as userFetchResponseProp)?.user ? userResponse.user : {} as UserDetailsProp;
    }, [userResponse]);

    return {
        user,
        error,
        setPage,
        isFetching,
        isLoading,
    } 
}