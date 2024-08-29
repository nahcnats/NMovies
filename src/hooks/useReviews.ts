import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getMovieProp, getMovieReviews } from "../services/movies-services";
import { Reviews } from '../models/Reviews';

export const useReviews = (movieId: getMovieProp) => {
    // return useQuery<Reviews, Error>({
    //     queryKey: ['movieReviews', movieId],
    //     queryFn: () => getMovieReviews(movieId)
    // });

    return useInfiniteQuery({
        queryKey: ['movieReviews', movieId],
        queryFn: ({ pageParam }) => getMovieReviews(pageParam, movieId),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = Object.keys(lastPage).length === 10 ? allPages.length + 1 : undefined;
            return nextPage;
        }
    });
};