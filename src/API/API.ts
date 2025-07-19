import { Configuration } from './scheme/rest-genereted';

export const DOMAIN_API_URL: string = import.meta.env.VITE_DOMAIN_API_URL;
export const BASE_API_CONFIG = new Configuration({ basePath: DOMAIN_API_URL });
