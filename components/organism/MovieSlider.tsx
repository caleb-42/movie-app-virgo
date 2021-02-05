import { Box } from '@chakra-ui/react';
import React from 'react';
import useBreakPoints from '../../hooks/useBreakPoints';
import Rerender from '../../utils/Rerender';
import ULHeading from '../atoms/Heading';
import ULSlider from '../molecules/carousel';
import MovieClip from '../molecules/MovieClip';

export default function MovieSlider({ list, title, activeNo = 0, render }) {
  const { xs, md, lg, sm } = useBreakPoints('max');

  const [items, setItems] = React.useState(1);
  React.useEffect(() => {
    if (!lg) setItems(5);
    else if (!md) setItems(3);
    else if (!sm) setItems(2);
    else setItems(1);
  }, [lg, md, sm]);
  console.log(sm, md, list);
  return (
    <Box
      height={md ? '460px' : '400px'}
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
            activeNo={activeNo}
            loaderHeight={md ? '300px' : '400px'}
            itemsNo={items}
            render={(item, index) => render(item, index)}
          />
        )}
      />
    </Box>
  );
}
