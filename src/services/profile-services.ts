import { server, apiErrorHandler } from "../utils";
import { Profile } from "../models/Profile";
import { getMovieRatingsProp } from "./movies-services";
import { WatchList } from "../models/WatchList";

export interface getProfileProps {
    session_id: string
}

export const getProfile = async (payload: getProfileProps): Promise<Profile> => {
    try {
        const res = await server.get(`/account/${payload.session_id}`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Watchlist Movies (GET)
// https://api.themoviedb.org/3/account/{account_id}/watchlist/movies
export const getWatchlist = async (payload: getMovieRatingsProp): Promise<WatchList> => {
    try {
        const res = await server.get(`/account/${payload.account_id}/watchlist/movies`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}