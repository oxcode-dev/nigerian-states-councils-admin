export const API_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || 'http://localhost:5000/api';

export const STATES_QUERY_KEY = 'list_states';
export const LGAS_QUERY_KEY = 'list_lgas';
export const WARDS_QUERY_KEY = 'list_wards';
export const USERS_QUERY_KEY = 'list_users';
export const AUTH_USER_QUERY_KEY = 'auth_user';

export const geoZones = [
    'North Central',
    'North East',
    'North West',
    'South East',
    'South South',
    'South West'
]