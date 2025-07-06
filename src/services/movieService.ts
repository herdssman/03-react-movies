import axios from 'axios'
import type { Movie } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;


interface MovieServiceProps {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}



export default async function fetchMovies(query: string): Promise<Movie[]> {

    try {

        const response = await axios.get<MovieServiceProps>(`${BASE_URL}/search/movie`,
            {
                params: {
                    query,
                },
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.results;


    } catch {

        throw new Error('Something went wrong')
    }

    
}