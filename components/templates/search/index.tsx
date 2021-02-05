import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Pagination } from '@material-ui/lab';
import MovieList from '../../organism/MovieList';

export default function SearchTemplate({ search, movies, handleChange, page }) {
  return (
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
  );
}
