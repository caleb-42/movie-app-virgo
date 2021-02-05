import React from 'react';
import PrivateRoute from '../../utils/privateRoute';
import MovieTemplate from '../../components/templates/movie/SingleMovie';

export default function MoviePage() {
  return <PrivateRoute Component={MovieTemplate} />;
}
