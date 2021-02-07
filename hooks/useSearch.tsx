import { useTheme } from '@chakra-ui/react';
import React from 'react';
import MoviesRoute from '../backend/movies';
import MovieList from '../components/organism/MovieList';
import { MovieList as MList } from '../models/movie';

export default function useSearch(val = '') {
  const [search, setSearch] = React.useState(val);
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState({} as MList);

  let movieapi = new MoviesRoute();

  const handleChange = async (event, page) => {
    let items = await movieapi.searchMovies(search, page);
    console.log('items', items);
    setPage(items?.page ?? 1);
    setMovies(items);
  };

  React.useEffect(() => {
    if (!search) return;
    setPage(1);
    movieapi
      .searchMovies(search, 1)
      .then((items) => {
        setMovies(items);
      })
      .finally(() => {});
  }, [search]);

  return { setSearch, search, movies, handleChange, page };
}
