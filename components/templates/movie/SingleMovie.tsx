import { Box, Spinner } from '@chakra-ui/react';
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
import Helper from '../../../utils';
import { MovieCast, MovieDetail, MovieList } from '../../../models/movie';
import MovieClip from '../../molecules/MovieClip';
import ULText from '../../atoms/Text';
import ULHeading from '../../atoms/Heading';
import CastClip from '../../molecules/CastClip';
import useBreakPoints from '../../../hooks/useBreakPoints';
import ULSlider from '../../molecules/carousel';

export default function SingleMovieTemplate({ user }) {
  const Router = useRouter();
  const { sm, md } = useBreakPoints();
  const { id = '' } = Router.query;
  const [singleMovie, setSingleMovie] = React.useState<MovieDetail>();
  const [castMovie, setCastMovie] = React.useState<Array<MovieCast>>();
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState(
    {} as MovieList
  );
  const { handleChange, movies, page, search, setSearch } = useSearch();

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    movieapi.getSingleMovie(Number(id)).then((res) => {
      setSingleMovie(res);
    });
    movieapi.getCast(Number(id)).then((res) => {
      setCastMovie(res);
    });
  }, []);

  return singleMovie ? (
    <>
      <SingleMovieStyle>
        <Header
          onSearch={(val) => {
            console.log(val);
            setSearch(val);
          }}
          promptSearch
        />
        <Box
          hidden={search !== ''}
          display="flex"
          flexDirection="column"
          flexGrow={1}
          w="100%"
          background={`url(${Helper.getImage(
            (singleMovie as MovieDetail).backdrop_path,
            '500'
          )})`}
          position="absolute"
          h="500px"
          maxW="1300px"
          bgRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="50%"
          className="back-drop"
        />
        <Box w="250px" h="400px" pos="relative" top="150px">
          <MovieClip deactivate movie={singleMovie} height="100%" />
        </Box>
        <Box w="100%" maxW="1200px" px="2rem" className="bodyp">
          <Box mt="200px">
            <ULHeading align="center" size="sm" fontWeight="600" value={singleMovie.title} />
          </Box>
          <Box maxW="500px" mt="1.5rem">
            <ULText
              fontSize=".85rem"
              fontWeight="400"
              align="center"
              value={singleMovie.overview}
            />
          </Box>
          <Box
            mt="1.5rem"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            w="100%"
            pos="static"
          >
            <MovieSlider
              list={castMovie}
              title="Cast"
              render={(item, index) => <CastClip key={index} cast={item} />}
            />
          </Box>
        </Box>
        <SearchTemplate
          search={search}
          handleChange={handleChange}
          movies={movies}
          page={page}
        />
      </SingleMovieStyle>{' '}
    </>
  ) : (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" />
    </Box>
  );
}
