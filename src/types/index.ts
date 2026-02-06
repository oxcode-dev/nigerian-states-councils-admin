export type StateFormProp = {
    name: string
    geo_zone: string
    code: string
    capital_city: string
    slogan: string
    description: string
    creation_year: number
    created_at: string
    _id?: string | null
};

export type LgaFormProp = {
    name: string
    state_id: string
    code: string
    capital_town: string
    slogan: string
    description: string
    creation_year: number
    created_at: string
    _id?: string | null
    state: {
        name: string
    }
};

export type WardFormProp = {
    name: string
    state_id: string
    code: string
    capital_town: string
    slogan: string
    description: string
    creation_year: number
    created_at: string
    _id?: string | null
    state: {
        name: string
    }
};

export type WardPaginationProp = {
    wards: WardFormProp[];
    metadata: {
        page: number
        limit: number
        totalCount: number
        totalPages:  number
    }
};
