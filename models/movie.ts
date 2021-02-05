export interface MovieCast {
  adult: boolean;
  gender: Number;
  id: Number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: Number;
  profile_path: string;
  cast_id: Number;
  character: string;
  credit_id: string;
  order: Number;
}

export interface MovieItem {
  adult: boolean;
  id: Number;
  popularity: Number;
  backdrop_path: string;
  genre_ids: Array<Number>;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: Number;
  vote_count: Number;
}
export interface MovieList {
  page: number;
  results: Array<MovieItem>;
  total_pages: number;
  total_results: number;
}

export interface MovieDetail {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: {
    id?: Number;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
  };
  budget?: Number;
  genres?: Array<{ id?: Number; name?: string }>;
  homepage?: string;
  id?: Number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: Number;
  poster_path?: string;
  production_companies?: Array<{
    id?: Number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
  }>;
  production_countries?: Array<{
    iso_3166_1?: string;
    name?: string;
  }>;
  release_date?: string;
  revenue?: Number;
  runtime?: Number;
  spoken_languages?: Array<{
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }>;
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: Number;
  vote_count?: Number;
}
