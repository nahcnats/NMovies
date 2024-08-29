type genre = {
    id: number
    name: string
}

type production_company = {
    id: number,
    logo_path: string,
    name: string,  
    origin_country: string
}

type production_country = {
    iso_3166_1: string,
    name: string
}

type spoken_language = {
    english_name: string,
    iso_639_1: string,
    name: string
}

export type Movie = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: unknown,
    budget: number,
    genres: genre[],
    homepage: string,
    id: number,
    imdb_id: string
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: production_company[],
    production_countries: production_country[],
    release_date: Date,
    revenue: number,
    runtime: number,
    spoken_languages: spoken_language[],
    status: string,
    tagline: unknown,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}