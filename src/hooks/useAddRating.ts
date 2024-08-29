import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../utils';

import { addMovieRating, addMovieRatingProp } from '../services/movies-services';

export const useAddRating = () => {
    return useMutation({
        mutationFn: (payload: addMovieRatingProp): Promise<boolean> => addMovieRating(payload),
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