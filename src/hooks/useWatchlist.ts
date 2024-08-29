import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getMovieRatingsProp } from "../services/movies-services";
import { WatchList } from '../models/WatchList';
import { getWatchlist } from '../services/profile-services';

export const useWatchlist = (account_id: getMovieRatingsProp) => {
    return useQuery<WatchList, Error>({
        queryKey: ['watchlist', account_id],
        queryFn: () => getWatchlist(account_id)
    });
    // return useInfiniteQuery({
    //     queryKey: ['watchlist', account_id],
    //     queryFn: ({ pageParam }) => getWatchlist(account_id),
    //     initialPageParam: 1,
    //     getNextPageParam: (lastPage, allPages) => {
    //         const nextPage = Object.keys(lastPage).length === 10 ? allPages.length + 1 : undefined;
    //         return nextPage;
    //     }
    // });
};