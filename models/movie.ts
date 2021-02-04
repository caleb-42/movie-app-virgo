export interface MovieCast {
  adult: boolean;
  gender: Number;
  id: Number;
  known_for_department: String;
  name: String;
  original_name: String;
  popularity: Number;
  profile_path: String;
  cast_id: Number;
  character: String;
  credit_id: String;
  order: Number;
}

export interface MovieItem {
  adult: boolean;
  id: Number;
  popularity: Number;
  backdrop_path: String;
  genre_ids: Array<Number>;
  original_language: String;
  original_title: String;
  overview: String;
  poster_path: String;
  release_date: String;
  title: String;
  video: boolean;
  vote_average: Number;
  vote_count: Number;
}

export interface MovieDetail {
  adult?: boolean;
  backdrop_path?: String;
  belongs_to_collection?: {
    id?: Number;
    name?: String;
    poster_path?: String;
    backdrop_path?: String;
  };
  budget?: Number;
  genres?: Array<{ id?: Number; name?: String }>;
  homepage?: String;
  id?: Number;
  imdb_id?: String;
  original_language?: String;
  original_title?: String;
  overview?: String;
  popularity?: Number;
  poster_path?: String;
  production_companies?: Array<{
    id?: Number;
    logo_path?: String;
    name?: String;
    origin_country?: String;
  }>;
  production_countries?: Array<{
    iso_3166_1?: String;
    name?: String;
  }>;
  release_date?: String;
  revenue?: Number;
  runtime?: Number;
  spoken_languages?: Array<{
    english_name?: String;
    iso_639_1?: String;
    name?: String;
  }>;
  status?: String;
  tagline?: String;
  title?: String;
  video?: boolean;
  vote_average?: Number;
  vote_count?: Number;
}
