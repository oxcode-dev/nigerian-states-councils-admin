import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { get } from '../services';
import { useMemo, useState } from 'react';
import { LGAS_QUERY_KEY } from '../constants';
import type { LgaFormProp, LgaPaginationProp } from '../types';

export const useFetchLocalGovt = () => {
    const [page, setPage] = useState(1);

    async function fetchLocalGovt() {
        const url = `/lgas?page=${page}`;
    
        const response = await get(url)

        if (!response.status || response.status !== 201) {
            throw new Error("Failed to fetch local governments");
        }

        return response?.data;
    }

    const { data: lgasList, error, isLoading, isFetching } = useQuery({
        queryKey: [LGAS_QUERY_KEY, page],
        queryFn: () => fetchLocalGovt(),
        placeholderData: keepPreviousData,
        staleTime: 10 * 60 * 1000,
    });

    const lgas: LgaFormProp[] = useMemo(() => {
        return (lgasList as LgaPaginationProp)?.lgas || [];
    }, [lgasList]);

    const metaData = useMemo(() => {
        return (lgasList as LgaPaginationProp)?.metadata || null;
    }, [lgasList]);

    return {
        lgas,
        metaData,
        setPage,
        error,
        isFetching,
        isLoading,
    } 
}