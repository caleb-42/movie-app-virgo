import { Box, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Router from 'next/router';
import useBreakPoints from '../../hooks/useBreakPoints';
import { MovieItem } from '../../models/movie';
import Helper from '../../utils';
import ULButton from '../atoms/Button';
import ULText from '../atoms/Text';

export default function MovieClip({
  movie,
  height = '300px',
  subOverview = 150,
  index = 0,
  deactivate = false,
}) {
  const { sm, md } = useBreakPoints();
  const bg = useColorModeValue('#ddd', '#222');
  const color = useColorModeValue('#222', '#fff');
  const movieItem = movie as MovieItem;

  const Style = styled(Box)`
    & {
      cursor: pointer;
      overflow: hidden;
      transition: all 0.4s ease-out;
      background-color: #000;
      ${({ theme }) => Helper.breakpoints(theme, 'sm', 'down')} {
        .back {
          padding: 2rem;
        }
        .overview {
          margin-top: 1rem;
        }
      }
      .tab {
        transition: all 0.7s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .back {
        padding: 1rem;
      }
      .overview {
        margin-top: 0.5rem;
        height: 150px;
        oveflow: hidden;
      }
      button.more-btn {
        color: #fff;
        background: ${(props: any) => props.theme.colors.primaryColor.main};
      }
      box-shadow: 0 0 200px 200px rgba(3, 3, 3, 0) inset;
      ${deactivate
        ? ''
        : `&:hover {
        box-shadow: 0 0 200px 200px rgba(3, 3, 3, 0.8) inset;
        .back {
          opacity: 1;
        }
        .tab {
          bottom: -50px;
        }
      }`}
    }
  `;
  return (
    <Style
      boxShadow="2xl"
      borderRadius={sm ? '20px' : '0'}
      key={index}
      bg={`#${index}f${index}33${index}f${index}`}
      h={height}
      background={`url(${Helper.getImage(
        movieItem.poster_path,
        md ? '500' : '300'
      )})`}
      backgroundSize="cover"
      display="flex"
      flexDir="column"
      pos="relative"
    >
      <Box
        opacity={0}
        display="flex"
        className="back"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        px={2}
      >
        <Box className="title">
          <ULText
            fontSize="1rem"
            color="#fff"
            fontWeight="700"
            align="center"
            value={movieItem.title}
          />
        </Box>
        <Box
          className="overview"
          fontSize=".8rem"
          color="#fff"
          fontWeight="500"
          align="center"
        >
          {`${
            subOverview
              ? movieItem.overview.substring(0, subOverview)
              : movieItem.overview
          }...`}
        </Box>
        <Box>
          <ULButton
            fontSize=".9rem"
            width="7rem"
            variant="solid"
            onClick={() => Router.push(`/movie/${movieItem.id}`)}
            borderRadius="5rem"
            props={{ className: 'more-btn' }}
          >
            More
          </ULButton>
        </Box>
      </Box>
      <Box
        left="0"
        bottom="0"
        px={2}
        pos="absolute"
        className="tab"
        width="100%"
        height="50px"
        bg={bg}
      >
        <ULText
          fontSize=".9rem"
          color={color}
          fontWeight="500"
          align="center"
          value={movieItem.title as string}
        />
      </Box>
    </Style>
  );
}
