import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';
import { WARDS_QUERY_KEY } from '../constants';
import type { WardFormProp, WardPaginationProp } from '../types';

export const useFetchWards = () => {
    async function fetchWards() {
        const url = '/wards';
    
        const response = await get(url)

        if (!response.status || response.status !== 201) {
            throw new Error("Failed to fetch wards");
        }

        return response?.data;
    }

    const { data: wardList, error, isLoading, isFetching } = useQuery({
        queryKey: [WARDS_QUERY_KEY],
        queryFn: () => fetchWards(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const wards: WardFormProp[] = useMemo(() => {
        return (wardList as WardPaginationProp)?.wards || [];
    }, [wardList]);

    const metaData = useMemo(() => {
        return (wardList as WardPaginationProp)?.metadata || null;
    }, [wardList]);

    return {
        wards,
        metaData,
        error,
        isFetching,
        isLoading,
    } 
}