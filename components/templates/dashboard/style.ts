import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Helper from '../../../utils';
import assets from '../../../utils/assets';

export const DashboardStyle = styled(Box)`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    ${({ theme }) => Helper.breakpoints(theme, 'sm', 'up')} {
      padding: 0 2rem;
    }

    .carousel {
      &-header {
        h3 {
          font-size: 20px;
          font-weight: 500;
        }
      }
      &-con {
        margin-top: 1rem;
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
  }
`;
