import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../utils';

import { removeMovieRating, getMovieProp } from '../services/movies-services';

export const useRemoveRating = () => {
    return useMutation({
        mutationFn: (payload: getMovieProp): Promise<boolean> => removeMovieRating(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['movieRatings']
            })
        },
        onError: (error: any) => {
            throw error;
        }}
    )
};