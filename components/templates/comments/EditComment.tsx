import React from 'react';
import { Box, Button, Image, Textarea } from '@chakra-ui/react';
import { EditCommentStyle, EditBoxStyle } from './style';
import assets from '../../../utils/assets';
import * as Yup from 'yup';
import ULText from '../../atoms/Text';
import { MovieComment } from '../../../models/comment';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import CommentRoute from '../../../backend/comments';
import ULButton from '../../atoms/Button';
import useBreakPoints from '../../../hooks/useBreakPoints';

export default function EditComment({
  comment,
  canEdit = false,
  editComplete = () => {},
  user,
}) {
  let item = comment as MovieComment;
  const [isLoading, setLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  let commentApi = new CommentRoute();
  const { sm } = useBreakPoints();

  const deleteComment = () => {
    commentApi
      .removeMovieComment(item.movieId, user, item.timeStamp)
      .then((res) => {
        console.log('rop', res);
      })
      .finally(() => {
        editComplete();
      });
  };

  const formik = useFormik({
    initialValues: {
      comment: item.comment,
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
        .editMovieComment(
          item.movieId,
          user,
          formik.values.comment,
          item.timeStamp
        )
        .then((res) => {
          console.log('rop', res);
        })
        .finally(() => {
          setLoading(false);
          editComplete();
          setEditMode(false);
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

  return !editMode ? (
    <EditCommentStyle
      mb="2rem"
      alignItems="center"
      display="flex"
      w="100%"
      opacity={canEdit ? 1 : 0.8}
    >
      <Box display="flex" flexGrow={1} className="detail">
        <Image src={assets.profile} width="40px" height="40px" />
        <Box ml="1rem" w="100%" display="flex" flexDir="column">
          <ULText
            color={canEdit ? 'primaryColor.main' : '#fff'}
            fontSize=".9rem"
            fontWeight="600"
            value={item.email}
          />
          <ULText fontSize="1.1rem" value={item.comment} />
        </Box>
      </Box>
      <Box
        hidden={!canEdit}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        width="200px"
        className="actions"
      >
        <Button
          width="3rem"
          height="3rem"
          alignItems="center"
          justifyContent="center"
          display="flex"
          borderRadius="5rem"
          padding=".5rem"
          className="edit"
          onClick={() => {
            setEditMode(true);
          }}
          style={{
            borderColor: 'rgba(108, 185, 62, 1)',
          }}
        >
          <EditIcon color="rgba(108, 185, 62, 1)" />
        </Button>
        <Button
          width="3rem"
          ml="2rem"
          height="3rem"
          alignItems="center"
          justifyContent="center"
          display="flex"
          borderRadius="5rem"
          padding=".5rem"
          bg="rgba(255, 0,0,.35)"
          className="delete"
          onClick={() => deleteComment()}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </EditCommentStyle>
  ) : (
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <EditBoxStyle
        mb="2rem"
        w="100%"
        display="flex"
        alignItems="flex-end"
        flexDir="column"
      >
        <Box
          mb=".5rem"
          alignItems="center"
          display="flex"
          w="100%"
          flexGrow={1}
          className="detail"
        >
          <Image src={assets.profile} width="40px" height="40px" />
          <Box ml="1rem" w="100%" display="flex" flexDir="column">
            <ULText fontSize=".9rem" fontWeight="600" value={item.email} />
          </Box>
        </Box>
        <Box pl="3rem" w="100%">
          <Textarea
            rows={3}
            fontSize="14px"
            fontWeight="500"
            value={formik.values.comment}
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
          <Box display="flex" w="100%" justifyContent="flex-end" mt={4}>
            <ULButton
              onClick={() => setEditMode(false)}
              props={{ type: 'button' }}
              width="100px"
            >
              cancel
            </ULButton>
            <Box mx=".8rem" />
            <ULButton
              props={{ type: 'submit', className: 'submit-btn' }}
              isLoading={isLoading}
              width="100px"
            >
              submit
            </ULButton>
          </Box>
        </Box>
      </EditBoxStyle>
    </form>
  );
}
