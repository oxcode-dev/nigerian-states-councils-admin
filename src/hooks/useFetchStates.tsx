import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';

export const useFetchStates = () => {
    async function fetchStates() {
        const url = '/states';
    
        const response = await get(url)

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        return response.json();
    }

    const { data: stateList, error, isLoading, isFetching } = useQuery({
        queryKey: ["list_states"],
        queryFn: () => fetchStates(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const states = useMemo(() => {
        return stateList?.data || [];
    }, [stateList]);

    return {
        states,
        error,
        isFetching,
        isLoading,
    } 
}