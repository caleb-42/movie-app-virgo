import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Helper from '../../../utils';
import assets from '../../../utils/assets';

export const SingleMovieStyle = styled(Box)`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .back-drop {
      box-shadow: 0 0 200px 200px rgba(3, 3, 3, 0.85) inset;
    }
    animation: appear 1s ease-in-out;
    @keyframes appear {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    ${({ theme }) => Helper.breakpoints(theme, 'sm', 'up')} {
      padding: 0 2rem;
    }

    .carousel {
      &-header {
        h3 {
          font-size: 20px;
          font-weight: 600;
        }
      }
      &-con {
        margin-top: 2rem;
      }
      ${({ theme }) => Helper.breakpoints(theme, 'sm', 'up')} {
        &-con {
          margin-top: 2rem;
        }
        &-header {
          border-bottom: 0.5px solid #999;
          padding: 1rem 0;
          h3 {
            text-align: left;
          }
        }
      }
    }
    .bodyp {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
