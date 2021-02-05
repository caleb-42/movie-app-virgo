import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Helper from '../../../utils';
import assets from '../../../utils/assets';

export const MovieCommentStyle = styled(Box)`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding 4rem 0;
    width:100%;
    .submit-btn button{
      background: rgba(108, 185, 62, 1) !important;
      color: white;
      border-color: rgba(108, 185, 62, 1);
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
  }
`;

export const EditCommentStyle = styled(Box)`
  & {
    ${({ theme }) => Helper.breakpoints(theme, 'md', 'down')} {
      align-items: center;
      flex-direction: column;
      .detail {
        width: 100%;
      }
      .actions {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
      }
    }

    button {
      width: 1rem;
      height: 2.5rem;
    }
    button.edit:hover {
      background: rgba(108, 185, 62, 1) !important;
      svg {
        color: white;
      }
    }
  }
`;

export const EditBoxStyle = styled(Box)`
  & {
    button.submit-btn {
      &:hover {
        background: rgba(108, 185, 62, 1) !important;
        color: white; !important;
        color: white;
      }
      color: rgba(108, 185, 62, 1);
      border-color: rgba(108, 185, 62, 1);
    }
  }
`;
/* display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding 4rem 0;
    width:100%;
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
    } */
