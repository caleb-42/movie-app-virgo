import { Box, Switch, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../../../backend/auth';
import ULButton from '../../atoms/Button';
import ULHeading from '../../atoms/Heading';
import ULText from '../../atoms/Text';
import MoviesRoute, { MovieCategory } from '../../../backend/movies';
import ULSlider from '../../molecules/carousel';
import { DashboardStyle } from './style';
import Logo from '../../icons/Logo';
import useBreakPoints from '../../../hooks/useBreakPoints';
import Rerender from '../../../utils/Rerender';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import MovieSlider from './MovieSlider';
import Header from '../../molecules/Header';
import MovieList from './MovieList';

export default function DashboardTemplate({ user }) {
  const Router = useRouter();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    /*
    movieapi.getCast(475557).then(console.log).catch(console.log);
    movieapi
      .getMovies(MovieCategory.TOP_RATED)
      .then((res) => {
        console.log(res.results);
        const result = res.results[0];
        const comment = new CommentRoute();
        comment
          .setMovieComment(result.id, user, 'stop lop')
          .then(console.log)
          .catch(console.log);
        comment
          .getMovieComments(result.id)
          .then((res) => {
            console.log('res', res);
          })
          .catch(console.log);
        comment
          .removeMovieComment(result.id, user.uid)
          .then((res) => {
            console.log('res', res);
          })
          .catch(console.log);
      })
      .catch((err) => console.log); */
    /* movieapi.searchMovies('game of thrones').then(console.log); */
  }, []);

  return (
    <DashboardStyle>
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
      >
        <MovieSlider list={null} title="Now Playing" />
        <MovieSlider list={null} title="Upcoming" />
        <MovieSlider list={null} title="Popular" />
        <MovieSlider list={null} title="Top Rated" />
      </Box>
      <Box w="100%" hidden={search === ''}>
        <MovieList title={`"${search}"`} />
      </Box>
    </DashboardStyle>
  );
}
