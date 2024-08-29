import { useQuery } from '@tanstack/react-query';

import { getMovieRatings, getMovieRatingsProp } from '../services/movies-services';
import { RatedMovies } from '../models/RatedMovies';

export const useRatings = (account_id: getMovieRatingsProp) => {
    return useQuery<RatedMovies, Error>({
        queryKey: ['movieRatings', account_id],
        queryFn: () => getMovieRatings(account_id)
    });
};