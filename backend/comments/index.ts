import { rejects } from 'assert';
import firebase from '../firebase';
const { database } = firebase;

export default class CommentRoute {
  async setMovieComment(movieId, user, comment) {
    const timeStamp = new Date().getTime();
    try {
      let v = await database()
        .ref(`comments/${movieId}/${user.uid}-${timeStamp}`)
        .set({
          id: user.uid,
          email: user.email,
          comment: comment,
          movie: movieId,
          timeStamp,
        });
      console.log(v);
      return v;
    } catch (e) {
      throw e;
    }
  }
  async getMovieComments(movieId) {
    try {
      let comments = await database().ref(`comments/${movieId}`);
      return new Promise((resolve) => {
        comments.on('value', (snapshot) => {
          const item = snapshot.val();
          resolve(item);
        });
      });
    } catch (e) {
      throw e;
    }
  }
  async removeMovieComment(movieId, userId) {
    try {
      return database().ref(`comments/${movieId}/${userId}`).remove();
    } catch (e) {
      throw e;
    }
  }
}
