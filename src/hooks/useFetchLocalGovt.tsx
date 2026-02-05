import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo } from 'react';
import { LGAS_QUERY_KEY } from '../constants';
import type { LgaFormProp } from '../types';

export const useFetchLocalGovt = () => {
    async function fetchLocalGovt() {
        const url = '/lgas';
    
        const response = await get(url)

        if (!response.ok) {
            throw new Error("Failed to fetch local governments");
        }

        return response.json();
    }

    const { data: lgasList, error, isLoading, isFetching } = useQuery({
        queryKey: [LGAS_QUERY_KEY],
        queryFn: () => fetchLocalGovt(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const lgas: LgaFormProp[] = useMemo(() => {
        return lgasList || [];
    }, [lgasList]);

    return {
        lgas,
        error,
        isFetching,
        isLoading,
    } 
}