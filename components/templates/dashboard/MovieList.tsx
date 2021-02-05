import { Box, Skeleton, Switch, useColorMode } from '@chakra-ui/react';
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
import MovieClip from './MovieClip';

export default function MovieList({ list = [], title }) {
  const Router = useRouter();
  const { md, lg, sm } = useBreakPoints();

  const [items, setItems] = React.useState(1);
  React.useEffect(() => {
    if (lg) setItems(5);
    else if (md) setItems(3);
    else setItems(1);
  }, [lg, md]);

  return (
    <Box className="carousel-con" w="100%" maxW="1200px" mx="auto">
      <Box w="100%" mb="1rem" className="carousel-header">
        <ULHeading type="h3" align="center" value={title} size="sm" />
      </Box>
      <Box
        w="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="flex"
        flexWrap="wrap"
        minH="600px"
      >
        {(list?.length > 0 ? list : Array.from(Array(12).values())).map(
          (item, ind) => {
            console.log(item);
            return (
              <Box h="400px" w={`${100 / items}%`} p="1rem" mb="3rem">
                {!item ? (
                  <Skeleton height="100%" />
                ) : (
                  <MovieClip height="380px" index={ind} movie={item} />
                )}
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
}
