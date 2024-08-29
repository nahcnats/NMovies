import { useQuery } from '@tanstack/react-query';

import { getMovie, getMovieProp } from "../services/movies-services";
import { Movie } from '../models/Movie';

export const useMovie = (movieId: getMovieProp) => {
    return useQuery<Movie, Error>({
        queryKey: ['movie', movieId],
        queryFn: () => getMovie(movieId)
    });
};