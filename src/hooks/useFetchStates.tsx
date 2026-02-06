import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo, useState } from 'react';
import { STATES_QUERY_KEY } from '../constants';
import type { StateFormProp, StatePaginationProp } from '../types';

export const useFetchStates = () => {
    const [page, setPage] = useState(1);

    async function fetchStates() {
        const url = `/states?page=${page}`;
    
        const response = await get(url)

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        return response.json();
    }

    const { data: stateList, error, isLoading, isFetching } = useQuery({
        queryKey: [STATES_QUERY_KEY, page],
        queryFn: () => fetchStates(),
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
        setPage,
        metaData,
        error,
        isFetching,
        isLoading,
    } 
}