import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../backend/auth';
import ULButton from '../components/atoms/Button';
import ULHeading from '../components/atoms/Heading';
import ULText from '../components/atoms/Text';
import PrivateRoute from '../utils/privateRoute';
import MoviesRoute, { MovieCategory } from '../backend/movies';
import CommentRoute from '../backend/comments';

function Dashboard({ user }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const Router = useRouter();

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
    let movieapi = new MoviesRoute();
    movieapi.getCast(475557).then(console.log).catch(console.log);
    /*
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

  const signOut = () => {
    var auth = new AuthRoute();
    auth.SignOut();
    Router.replace('/');
  };

  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <ULHeading props={{ mb: '2rem' }} value="Welcome" />
      <ULButton
        onClick={toggleColorMode}
        colorScheme={colorMode == 'light' ? 'secondary' : 'primary'}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </ULButton>
      <Box m={3}>
        <ULButton onClick={signOut}>Signout</ULButton>
      </Box>
      <Box w="500px" m={3}>
        <ULText value="A lot happened this year. Lots of sad tales. To be honest, it’s a bit difficult to write a review about this year without being overwhelmed with all that happened. Regardless, I’m going to keep my personal sad tales out of this review and focus on how my year in tech went as I’ve always done." />
      </Box>
    </Box>
  );
}

export default function DashboardComp() {
  return <PrivateRoute Component={Dashboard} />;
}
