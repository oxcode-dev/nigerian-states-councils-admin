import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';
import { STATES_QUERY_KEY } from '../constants';
import type { StateFormProp } from '../types';

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
        queryKey: [STATES_QUERY_KEY],
        queryFn: () => fetchStates(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const states: StateFormProp[] = useMemo(() => {
        return stateList || [];
    }, [stateList]);

    return {
        states,
        error,
        isFetching,
        isLoading,
    } 
}