import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo, useState } from 'react';
import { USERS_QUERY_KEY } from '../constants';
import { useLocalStorageToken } from './useLocalStorageToken';
import type { UserDetailsProp, UserPaginationProp } from '../types';

export const useFetchUsers = () => {
    const [page, setPage] = useState(1);

    const { getToken } = useLocalStorageToken()
    
    async function fetchUsers() {
        const url = `/users?page=${page}`;
    
        const response = await get(url, getToken())

        if (!response.status || response.status !== 200) {
            throw new Error("Failed to fetch user details");
        }

        return response?.data;
    }

    const { data: userResponse, error, isLoading, isFetching } = useQuery({
        queryKey: [USERS_QUERY_KEY, page],
        queryFn: () => fetchUsers(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const users: UserDetailsProp[] = useMemo(() => {
        return (userResponse as UserPaginationProp)?.users || [];
    }, [userResponse]);

    const metaData = useMemo(() => {
        return (userResponse as UserPaginationProp)?.metadata || null;
    }, [userResponse]);

    return {
        users,
        metaData,
        error,
        setPage,
        isFetching,
        isLoading,
    } 
}