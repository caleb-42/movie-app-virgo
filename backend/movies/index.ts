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

  async getMovies(movieType: MovieCategory, page: Number) {
    let resp;
    switch (movieType) {
      case MovieCategory.POPULAR:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/popular?api_key=${key}&page=${page}`,
          });
        break;
      case MovieCategory.TOP_RATED:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/top_rated?api_key=${key}&page=${page}`,
          });
        break;
      case MovieCategory.NOW_PLAYING:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/now_playing?api_key=${key}&page=${page}`,
          });
        break;
      case MovieCategory.UPCOMING:
        resp = () =>
          Helper.axiosCall({
            method: 'GET',
            host: `${this.host}/upcoming?api_key=${key}&page=${page}`,
          });
        break;
      default:
        resp = null;
    }
    try {
      let movies = await resp();
      return movies.data;
    } catch (e) {
      return { page: 0, results: [], total_pages: 0, total_results: 0 };
    }
  }
  async searchMovies(text: string, page: number) {
    try {
      let movie = await Helper.axiosCall({
        method: 'GET',
        host: `${this.seachHost}?api_key=${key}&language=en-US&query=${text}&page=${page}`,
      });
      console.log(movie.data);
      let data = movie?.data;
      return data;
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
      return movie?.data;
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
      let data = cast?.data?.cast;
      return data;
    } catch (e) {
      return null;
    }
  }
}
