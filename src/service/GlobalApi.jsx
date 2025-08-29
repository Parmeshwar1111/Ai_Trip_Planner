import axios from "axios";

const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const GetUnsplashPhoto = (query) => {
    return axios.get(UNSPLASH_BASE_URL, {
        params: {
            query,
            per_page: 1,
            orientation: 'landscape',
            client_id: UNSPLASH_ACCESS_KEY
        }
    });
};