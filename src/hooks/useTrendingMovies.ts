import { useQuery } from '@tanstack/react-query';

import { getTrendingMovies } from "../services/movies-services";
import { TrendingMovie } from '../models/TrendingMovie';

export const useTrendingMovies = () => {
    return useQuery<TrendingMovie[], Error>({
        queryKey: ['trendingMovies'],
        queryFn: () => getTrendingMovies()
    });
};