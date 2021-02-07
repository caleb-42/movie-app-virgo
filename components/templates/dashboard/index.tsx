import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@material-ui/lab';
import AuthRoute from '../../../backend/auth';
import MoviesRoute, { MovieCategory } from '../../../backend/movies';
import { DashboardStyle } from './style';
import MovieSlider from '../../organism/MovieSlider';
import Header from '../../molecules/Header';
import MovieList from '../../organism/MovieList';
import { MovieList as MList } from '../../../models/movie';
import { css } from '@emotion/react';
import SearchTemplate from '../search';
import useSearch from '../../../hooks/useSearch';
import MovieClip from '../../molecules/MovieClip';
import useBreakPoints from '../../../hooks/useBreakPoints';

export default function DashboardTemplate({ user }) {
  const { md } = useBreakPoints();
  const [loading, setLoading] = React.useState(false);
  const { handleChange, movies, page, search, setSearch } = useSearch();
  const [popularMovies, setPopularMovies] = React.useState({} as MList);
  const [topRatedMovies, setTopRatedMovies] = React.useState({} as MList);
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState({} as MList);
  const [upcomingMovies, setUpcomingMovies] = React.useState({} as MList);
  let movieapi = new MoviesRoute();

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    setLoading(true);
    Promise.all([
      movieapi.getMovies(MovieCategory.POPULAR, 1),
      movieapi.getMovies(MovieCategory.TOP_RATED, 1),
      movieapi.getMovies(MovieCategory.UPCOMING, 1),
      movieapi.getMovies(MovieCategory.NOW_PLAYING, 1),
    ]).then(({ 0: popM, 1: topM, 2: upcomingM, 3: nowM }) => {
      setLoading(false);
      setPopularMovies(popM);
      setTopRatedMovies(topM);
      setUpcomingMovies(upcomingM);
      setNowPlayingMovies(nowM);
    });
  }, []);

  return loading ? (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" />
    </Box>
  ) : (
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
        <MovieSlider
          render={(item, index) => (
            <MovieClip
              height={md ? '300px' : '400px'}
              index={index}
              movie={item}
              subOverview={150}
            />
          )}
          list={nowPlayingMovies.results}
          title="Now Playing"
        />
        <MovieSlider
          list={upcomingMovies.results}
          render={(item, index) => (
            <MovieClip
              height={md ? '300px' : '400px'}
              index={index}
              movie={item}
              subOverview={150}
            />
          )}
          activeNo={1}
          title="Upcoming"
        />
        <MovieSlider
          list={popularMovies.results}
          render={(item, index) => (
            <MovieClip
              height={md ? '300px' : '400px'}
              index={index}
              movie={item}
              subOverview={150}
            />
          )}
          activeNo={2}
          title="Popular"
        />
        <MovieSlider
          render={(item, index) => (
            <MovieClip
              height={md ? '300px' : '400px'}
              index={index}
              movie={item}
              subOverview={150}
            />
          )}
          list={topRatedMovies.results}
          activeNo={3}
          title="Top Rated"
        />
      </Box>

      <SearchTemplate
        search={search}
        handleChange={handleChange}
        movies={movies}
        page={page}
      />
    </DashboardStyle>
  );
}
