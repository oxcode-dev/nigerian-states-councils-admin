import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';
import { WARDS_QUERY_KEY } from '../constants';
import type { WardFormProp } from '../types';

export const useFetchWards = () => {
    async function fetchWards() {
        const url = '/wards';
    
        const response = await get(url)

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        return response.json();
    }

    const { data: wardList, error, isLoading, isFetching } = useQuery({
        queryKey: [WARDS_QUERY_KEY],
        queryFn: () => fetchWards(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const wards: WardFormProp[] = useMemo(() => {
        return wardList || [];
    }, [wardList]);

    return {
        wards,
        error,
        isFetching,
        isLoading,
    } 
}