import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useBreakPoints from '../../hooks/useBreakPoints';
import { MovieItem } from '../../models/movie';
import ULText from '../atoms/Text';

export interface ListItems {
  list: Array<any>;
  page: Number;
  pages: Number;
}

export const Pagination = ({ height = '900px', items, children, next }) => {
  const [itemList, setItemList] = React.useState(items.list);

  const { sm } = useBreakPoints();

  const fetchMoreData = () => {
    const newPage = items.page + 1;
    console.log('newPage', newPage);
    next(newPage, (list = []) => {
      if (list && list.length > 0) {
        setItemList(itemList.concat(list));
      }
    });
  };
  return (
    <div id="scrollTarget" style={{ height, overflow: 'auto' }}>
      <InfiniteScroll
        scrollableTarget="scrollTarget"
        dataLength={itemList.length}
        next={fetchMoreData}
        hasMore={items.pages > items.page}
        loader={
          <Box display="flex" justifyContent="center" padding="1rem">
            <Spinner width="1.5rem" height="1.5rem" />
          </Box>
        }
        endMessage={<ULText value="Yay! You have seen it all" />}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};
