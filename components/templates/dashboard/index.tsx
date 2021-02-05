import { Box } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@material-ui/lab';
import AuthRoute from '../../../backend/auth';
import MoviesRoute, { MovieCategory } from '../../../backend/movies';
import { DashboardStyle } from './style';
import MovieSlider from './MovieSlider';
import Header from '../../molecules/Header';
import MovieList from './MovieList';
import { MovieList as MList } from '../../../models/movie';
import { css } from '@emotion/react';

export default function DashboardTemplate({ user }) {
  const Router = useRouter();
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState({} as MList);
  const [popularMovies, setPopularMovies] = React.useState({} as MList);
  const [topRatedMovies, setTopRatedMovies] = React.useState({} as MList);
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState({} as MList);
  const [upcomingMovies, setUpcomingMovies] = React.useState({} as MList);
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

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    movieapi.getMovies(MovieCategory.POPULAR, 1).then((res) => {
      setPopularMovies(res);
    });
    movieapi.getMovies(MovieCategory.TOP_RATED, 1).then((res) => {
      setTopRatedMovies(res);
    });
    movieapi.getMovies(MovieCategory.UPCOMING, 1).then((res) => {
      setUpcomingMovies(res);
    });
    movieapi.getMovies(MovieCategory.NOW_PLAYING, 1).then((res) => {
      setNowPlayingMovies(res);
    });
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
        <MovieSlider list={nowPlayingMovies.results} title="Now Playing" />
        <MovieSlider
          list={upcomingMovies.results}
          activeNo={1}
          title="Upcoming"
        />
        <MovieSlider
          list={popularMovies.results}
          activeNo={2}
          title="Popular"
        />
        <MovieSlider
          list={topRatedMovies.results}
          activeNo={3}
          title="Top Rated"
        />
      </Box>
      <Box w="100%" hidden={search === ''}>
        <MovieList list={movies.results} title={`"${search}"`} />
        <Box
          css={css`
            & {
              width: 100%;
              display: flex;
              justify-content: center;
              padding: 5rem 0;
              ul li button {
                padding: 0.5rem;
                height: 26px;
                min-width: 26px;
                font-size: 0.8rem;
                background: #fff;
                margin: 0 0.3rem;
                &.Mui-selected {
                  background: #de365e;
                  color: #fff;
                }
                &:hover {
                  background: #aaa;
                  &.Mui-selected {
                    background: #de365e;
                    color: #fff;
                  }
                }
              }
            }
          `}
        >
          <Pagination
            onChange={handleChange}
            className="pagination"
            variant="outlined"
            page={page}
            size="large"
            count={movies?.total_pages}
          />
        </Box>
      </Box>
    </DashboardStyle>
  );
}
