import { MovieDetail, MovieItem } from '../../models/movie';
import Helper from '../../utils';

export enum MovieCategory {
  POPULAR,
  TOP_RATED,
  NOW_PLAYING,
  UPCOMING,
}

const { REACT_APP_MOVIE_API_KEY: key } = process.env;

export default class MoviesRoute {
  host = 'https://api.themoviedb.org/3/movie';
  seachHost = 'https://api.themoviedb.org/3/search/movie';

  async getMovies(movieType: MovieCategory) {
    let resp;
    switch (movieType) {
      case MovieCategory.POPULAR:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/popular?api_key=${key}`,
          });
        break;
      case MovieCategory.TOP_RATED:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/top_rated?api_key=${key}`,
          });
        break;
      case MovieCategory.NOW_PLAYING:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/now_playing?api_key=${key}`,
          });
        break;
      case MovieCategory.UPCOMING:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/upcoming?api_key=${key}`,
          });
        break;
      default:
        resp = null;
    }
    try {
      let movies = await resp();
      let data = movies?.data;
      console.log({
        adult: data?.adult,
        backdrop_path: data?.backdrop_path,
        genre_ids: data?.genre_ids,
        id: data?.id,
        original_language: data?.original_language,
        vote_average: data?.vote_average,
        original_title: data?.original_title,
        overview: data?.overview,
        popularity: data?.popularity,
        poster_path: data?.poster_path,
        vote_count: data?.vote_count,
        release_date: data?.release_date,
        title: data?.title,
        video: data?.video,
      } as MovieItem);
      return movies.data;
    } catch (e) {
      return { page: 0, results: [] };
    }
  }
  async searchMovies(text: string) {
    try {
      let movie = await Helper.axiosCall({
        method: 'GET',
        host: `${this.seachHost}?api_key=${key}&language=en-US&query=${text}`,
      });
      console.log(movie.data);
      let data = movie.data;
      return {
        adult: data?.adult,
        backdrop_path: data?.backdrop_path,
        genre_ids: data?.genre_ids,
        id: data?.id,
        original_language: data?.original_language,
        vote_average: data?.vote_average,
        original_title: data?.original_title,
        overview: data?.overview,
        popularity: data?.popularity,
        poster_path: data?.poster_path,
        vote_count: data?.vote_count,
        release_date: data?.release_date,
        title: data?.title,
        video: data?.video,
      } as MovieItem;
    } catch (e) {
      return null;
    }
  }
  async getSingleMovie(id: Number) {
    try {
      let movie = await Helper.axiosCall({
        method: 'GET',
        host: `${this.host}/${id}?api_key=${key}`,
      });
      console.log(movie.data);
      return movie.data;
    } catch (e) {
      return null;
    }
  }
  async getCast(id: Number) {
    try {
      let cast = await Helper.axiosCall({
        method: 'GET',
        host: `${this.host}/${id}/credits?api_key=${key}`,
      });
      console.log(cast?.data?.cast);
      let data = cast?.data?.cast;
      return {
        adult: data?.adult,
        backdrop_path: data?.backdrop_path,
        genre_ids: data?.genre_ids,
        id: data?.id,
        original_language: data?.original_language,
        vote_average: data?.vote_average,
        original_title: data?.original_title,
        overview: data?.overview,
        popularity: data?.popularity,
        poster_path: data?.poster_path,
        vote_count: data?.vote_count,
        release_date: data?.release_date,
        title: data?.title,
        video: data?.video,
        budget: data?.budget,
        genres: data?.genres,
      } as MovieDetail;
    } catch (e) {
      return null;
    }
  }
}
