import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../utils';

import { addWatchlist, addWatchlistProp } from '../services/movies-services';


export const useAddWatchlist = () => {
    return useMutation({
        mutationFn: (payload: addWatchlistProp): Promise<boolean> => addWatchlist(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['watchlist']
            })
        },
        onError: (error: any) => {
            throw error;
        }
    }
    )
};