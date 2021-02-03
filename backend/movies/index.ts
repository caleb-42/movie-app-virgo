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
      console.log(movies.data);
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
      return movie.data;
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
}
