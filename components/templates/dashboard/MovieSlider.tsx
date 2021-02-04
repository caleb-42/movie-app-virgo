import { Box } from '@chakra-ui/react';
import React from 'react';
import useBreakPoints from '../../../hooks/useBreakPoints';
import Rerender from '../../../utils/Rerender';
import ULHeading from '../../atoms/Heading';
import ULSlider from '../../molecules/carousel';
import MovieClip from './MovieClip';

export default function MovieSlider({ list, title }) {
  const { md, lg, sm } = useBreakPoints();

  const [items, setItems] = React.useState(1);
  React.useEffect(() => {
    if (lg) setItems(5);
    else if (md) setItems(3);
    else setItems(1);
  }, [lg, md]);

  return (
    <Box
      height="400px"
      className="carousel-con"
      w="100%"
      maxW="1200px"
      mx="auto"
    >
      <Box w="100%" mb="1rem" className="carousel-header">
        <ULHeading type="h3" align="center" value={title} size="sm" />
      </Box>
      <Rerender
        comp={() => (
          <ULSlider
            list={list}
            slidesToScroll={1}
            loaderHeight={sm ? '300px' : '330px'}
            itemsNo={items}
            render={(item, index) => <MovieClip index={index} movie={item} />}
          />
        )}
      />
    </Box>
  );
}
