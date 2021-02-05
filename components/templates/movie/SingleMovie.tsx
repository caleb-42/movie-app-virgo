import { Box } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@material-ui/lab';
import AuthRoute from '../../../backend/auth';
import MoviesRoute, { MovieCategory } from '../../../backend/movies';
import { SingleMovieStyle } from './style';
import MovieSlider from '../../organism/MovieSlider';
import useSearch from '../../../hooks/useSearch';
import Header from '../../molecules/Header';
import SearchTemplate from '../search';

export default function SingleMovieTemplate({ user }) {
  const Router = useRouter();
  const { handleChange, movies, page, search, setSearch } = useSearch();

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    /*  movieapi.getSingleMovie().then((res) => {
      setPopularMovies(res);
    }); */
  }, []);

  return (
    <SingleMovieStyle>
      <Header
        onSearch={(val) => {
          console.log(val);
          setSearch(val);
        }}
      />
      <Box
        hidden={search !== ''}
        display="flex"
        flexDirection="column"
        flexGrow={1}
        w="100%"
      ></Box>
      <SearchTemplate
        search={search}
        handleChange={handleChange}
        movies={movies}
        page={page}
      />
    </SingleMovieStyle>
  );
}
