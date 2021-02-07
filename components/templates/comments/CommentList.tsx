import { Box, Spinner, Textarea } from '@chakra-ui/react';
import React from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import AuthRoute from '../../../backend/auth';
import { MovieCommentStyle } from './style';
import MovieSlider from '../../organism/MovieSlider';
import useSearch from '../../../hooks/useSearch';
import Header from '../../molecules/Header';
import SearchTemplate from '../search';
import Helper from '../../../utils';
import { MovieCast, MovieDetail, MovieList } from '../../../models/movie';
import MovieClip from '../../molecules/MovieClip';
import ULText from '../../atoms/Text';
import ULHeading from '../../atoms/Heading';
import CastClip from '../../molecules/CastClip';
import useBreakPoints from '../../../hooks/useBreakPoints';
import { MovieComment } from '../../../models/comment';
import CommentRoute from '../../../backend/comments';
import ULButton from '../../atoms/Button';
import { useFormik } from 'formik';
import EditComment from './EditComment';

export default function CommentListTemplate({ user, movie }) {
  const [isLoading, setLoading] = React.useState(false);
  const { sm } = useBreakPoints();
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string('Enter your comment')
        .min(10)
        .max(200)
        .required('comment is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      commentApi
        .setMovieComment(movie.id, user, values.comment)
        .then((res) => {
          console.log('rop', res);
          setComments(res);
        })
        .finally(() => {
          setLoading(false);
          commentApi.getMovieComments((movie as MovieDetail).id).then((res) => {
            console.log('rop', res);
            setComments(res);
          });
        });
    },
  });
  console.log(formik.errors);

  const change = (name, e) => {
    console.log(name, e);
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  const [comments, setComments] = React.useState<any>({});
  let commentApi = new CommentRoute();

  React.useEffect(() => {
    console.log(user);
    commentApi.getMovieComments((movie as MovieDetail).id).then((res) => {
      console.log('rop', res);
      setComments(res);
    });
  }, []);

  return (
    <MovieCommentStyle>
      <Box className="enter-comment carousel" w="100%">
        <Box className="carousel-header" w="100%">
          <ULHeading type="h3" value="Comments" />
        </Box>
      </Box>
      <Box w="100%" maxW="1200px" className="carousel-con">
        <Box>
          <ULText
            align="left"
            fontWeight="500"
            value="What do you think about this Movie?"
            fontSize="16px"
          />
        </Box>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Box
            w="100%"
            mt="1.5rem"
            display="flex"
            alignItems="flex-end"
            flexDir="column"
          >
            <Textarea
              rows={3}
              fontSize="14px"
              fontWeight="500"
              align="center"
              onChange={(e) => change('comment', e)}
              name="comment"
            />
            {formik.touched.comment && Boolean(formik.errors.comment) && (
              <ULText
                fontSize="13px"
                fontWeight="600"
                color="red"
                value={formik.errors.comment}
              />
            )}
            <Box
              display="flex"
              w={sm ? '200px' : '100%'}
              justifyContent="flex-end"
              mt={4}
              className="submit-btn"
            >
              <ULButton
                props={{ type: 'submit' }}
                isLoading={isLoading}
                width="100%"
              >
                submit
              </ULButton>
            </Box>
          </Box>
        </form>
        {comments !== null && !Helper.isEmptyObj(comments) ? (
          <Box
            mt="1.5rem"
            p="2rem 0 5rem"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            w="100%"
            className="comment-list"
          >
            {Object.entries(comments).map((item) => {
              const val = item[1] as MovieComment;
              return (
                <EditComment
                  editComplete={() => {
                    commentApi
                      .getMovieComments((movie as MovieDetail).id)
                      .then((res) => {
                        console.log('rop', res);
                        setComments(res);
                      });
                  }}
                  user={user}
                  comment={val}
                  canEdit={val.userId === user.uid}
                />
              );
            })}
          </Box>
        ) : comments === null ? (
          <Box w="100%" display="flex" justifyContent="center" p="2rem 0 5rem">
            No Comments To SHow
          </Box>
        ) : (
          <Box
            height="100%"
            p="2rem 0 5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" />
          </Box>
        )}
      </Box>
    </MovieCommentStyle>
  );
}
