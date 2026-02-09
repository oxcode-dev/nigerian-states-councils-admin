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

export type StatePaginationProp = {
    states: StateFormProp[];
    metadata: {
        page: number
        limit: number
        totalCount: number
        totalPages:  number
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

export type LgaPaginationProp = {
    lgas: LgaFormProp[];
    metadata: {
        page: number
        limit: number
        totalCount: number
        totalPages:  number
    }
};

export type UserPaginationProp = {
    users: UserDetailsProp[];
    metadata: {
        page: number
        limit: number
        totalCount: number
        totalPages:  number
    }
};

export type UserDetailsProp = {
    email: string
    // role: string
    first_name: string
    last_name: string
    fullName: string
    isAdmin: boolean
    id: string
    _id?: string | null
}

export type userFetchResponseProp = {
    user: UserDetailsProp
    message: string
    status: string
}


