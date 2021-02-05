import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import ItemsCarousel from 'react-items-carousel';

const ULSlider = ({
  itemsNo = 1,
  chevronWidth = 60,
  gutter = 20,
  loaderHeight = '300px',
  slidesToScroll = 1,
  activeNo = 0,
  list = [],
  itemWidth = '20%',
  rightChevron = (
    <Box
      zIndex="5"
      p={1}
      bg="rgba(3,3,3,.3)"
      borderRadius="3rem"
      className="right-arrow"
      position="relative"
      left="-4rem"
    >
      <ChevronRightIcon w={10} h={10} />
    </Box>
  ),
  leftChevron = (
    <Box
      zIndex="5"
      p={1}
      bg="rgba(3,3,3,.3)"
      borderRadius="3rem"
      className="left-arrow"
      position="relative"
      right="-4rem"
    >
      <ChevronLeftIcon w={10} h={10} />
    </Box>
  ),
  render = (t, i) => <Box />,
}) => {
  const [items, setItems] = React.useState(itemsNo);
  const [active, setActive] = React.useState(activeNo);
  console.log(list);
  return (
    <Box
      className="body"
      h="100%"
      position="relative"
      w="100%"
      marginBottom="4rem"
    >
      <ItemsCarousel
        infiniteLoop
        gutter={gutter}
        activePosition="center"
        chevronWidth={chevronWidth}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={items}
        slidesToScroll={slidesToScroll}
        outsideChevron
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={active}
        requestToChangeActive={(value) => setActive(value)}
        rightChevron={rightChevron}
        leftChevron={leftChevron}
      >
        {(list?.length > 0
          ? list
          : Array.from(Array(12).values())
        ).map((item, ind) =>
          item ? render(item, ind) : <Skeleton height={loaderHeight} />
        )}
      </ItemsCarousel>
    </Box>
  );
};

export default ULSlider;
