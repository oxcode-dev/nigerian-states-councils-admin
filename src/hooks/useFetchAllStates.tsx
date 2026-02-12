import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';
import { ALL_STATES_QUERY_KEY } from '../constants';
import type { StateFormProp, StatePaginationProp } from '../types';

export const useFetchAllStates = () => {

    async function fetchAllStates() {
        const url = `/public/states`;
    
        const response = await get(url)

        if (!response.status || response.status !== 201) {
            throw new Error("Failed to fetch states");
        }

        return response?.data;
    }


    const { data: stateList, error, isLoading, isFetching } = useQuery({
        queryKey: [ALL_STATES_QUERY_KEY],
        queryFn: () => fetchAllStates(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const states: StateFormProp[] = useMemo(() => {
        return (stateList as StatePaginationProp)?.states || [];
    }, [stateList]);

    const metaData = useMemo(() => {
        return (stateList as StatePaginationProp)?.metadata || null;
    }, [stateList]);

    return {
        states,
        metaData,
        error,
        isFetching,
        isLoading,
    } 
}