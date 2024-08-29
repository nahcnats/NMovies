import { server, apiErrorHandler } from "../utils";

import { TrendingMovie } from "../models/TrendingMovie";
import { Movie } from "../models/Movie";
import { Reviews } from "../models/Reviews";
import { RatedMovies } from "../models/RatedMovies";
import { WatchList } from "../models/WatchList";
import { extend } from "lodash";

export interface getMovieProp {
    movieId: number,
}

export interface getMovieRatingsProp {
    account_id: number
}

export interface addWatchlistProp extends getMovieRatingsProp {
    media_id: number,
}

export interface searchMoviesProp {
    query: string,
    page: number
}

export interface addMovieRatingProp extends getMovieProp {
    value: number
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const res = await server.get(`/trending/movie/day?language=en-US`);

        return res.data.results;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

export const getMovie = async (payload: getMovieProp): Promise<Movie> => {
    try {
        const res = await server.get(`/movie/${payload.movieId}?language=en-US`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Reviews (GET)
// https://api.themoviedb.org/3/movie/{movie_id}/reviews
export const getMovieReviews = async (pageParam: number, payload: getMovieProp): Promise<Reviews> => {
    try {
        const res = await server.get(`/movie/${payload.movieId}/reviews?page=${pageParam}`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}


// Add Rating (POST)
// https://api.themoviedb.org/3/movie/{movie_id}/rating
export const addMovieRating = async (payload: addMovieRatingProp): Promise<boolean> => {
    try {
        const res = await server.post(`/movie/${payload.movieId}/rating`, {value: payload.value});

        return res.data.success;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Delete Rating (DELETE)
// https://api.themoviedb.org/3/movie/{movie_id}/rating
export const removeMovieRating = async (payload: getMovieProp): Promise<boolean> => {
    try {
        const res = await server.delete(`/movie/${payload.movieId}/rating`);

        return res.data.success;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Rated Movies (GET)
// https://api.themoviedb.org/3/account/{account_id}/rated/movies
export const getMovieRatings = async (payload: getMovieRatingsProp): Promise<RatedMovies> => {
    try {
        const res = await server.get(`/account/${payload.account_id}/rated/movies`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Add To Watchlist (POST)
// https://api.themoviedb.org/3/account/{account_id}/watchlist
export const addWatchlist = async (payload: addWatchlistProp): Promise<boolean> => {
    try {
        const res = await server.post(`/account/${payload.account_id}/watchlist`, 
        {
            media_type: 'movie',
            media_id: payload.media_id,
            watchlist: true  
        },
        );

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

// Search Movies
// https://api.themoviedb.org/3/search/movie
export const searchMovies = async (payload: searchMoviesProp): Promise<WatchList> => {
    try {
        const res = await server.get(`/search/movie?query=${payload.query}`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}