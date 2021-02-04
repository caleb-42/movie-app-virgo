import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Helper from '../../../utils';
import assets from '../../../utils/assets';

export const SiginStyle = styled(Box)`
  & {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 2rem;
    background: url(${assets.backdrop});
    background-size: cover;
    .header {
      ${({ theme }) => Helper.breakpoints(theme, 'lg', 'up')} {
        padding: 0 2rem;
      }
      ${({ theme }) => Helper.breakpoints(theme, 'lg', 'down')} {
        justify-content: center;
        display: flex;
      }
    }
    .signin-body {
      display: flex;
      align-items: center;
      flex-direction: column;
      .volgi-in-head-left {
        margin-bottom: 2rem;
        .movies p {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1rem;
          text-indent: 1rem;
        }
      }
      ${({ theme }) => Helper.breakpoints(theme, 'md', 'down')} {
        .volgi-in-head-left {
          display: none;
        }
      }
      ${({ theme }) => Helper.breakpoints(theme, 'lg', 'up')} {
        padding: 0 2rem;
        flex-direction: row;
        justify-content: space-between;
        .volgi-in-head-left {
          h1 {
            font-size: 110px;
          }
          .movies {
            width: 80%;
            background: ${(props: any) => props.theme.colors.primaryColor.main};
            p {
              font-size: 20px;
              font-weight: 500;
              letter-spacing: 1rem;
            }
          }
        }
      }
      justify-content: center;
      .form-con {
        max-width: 440px;
        height: 60%;
        display: flex;
        align-items: center;
        flex-direction: column;
        ${({ theme }) => Helper.breakpoints(theme, 'md', 'up')} {
          max-height: 280px;
          padding: 2rem;
          background: #1c1c1c;
          input {
            background: #484848;
            border: 0;
          }
          .sign-in-head {
            display: block;
          }
          .volgi-in-head {
            display: none;
          }
        }
      }
    }
  }
`;
