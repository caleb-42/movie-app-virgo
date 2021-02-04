import firebase from '../firebase';
import { Comment } from '../../models/comment';
const { database } = firebase;

export default class CommentRoute {
  async setMovieComment(movieId, user, comment) {
    const timeStamp = new Date().getTime();
    try {
      let v = await database()
        .ref(`comments/${movieId}/${user.uid}-${timeStamp}`)
        .set({
          userId: user.uid,
          email: user.email,
          comment: comment,
          movieId: movieId,
          timeStamp,
        } as Comment);
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
