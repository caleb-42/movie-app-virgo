import firebase from '../firebase';
const { database } = firebase;

export default class AuthRoute {
  static win: any;

  addUserRecord(user) {
    database()
      .ref(`users/${user.uid}`)
      .set({
        id: user.uid,
        name: user.displayName || 'default name',
        phone_number: user.phoneNumber,
        avatar: user.photoURL,
        groups: [],
        timestamp: new Date().getTime(),
      });
  }

  SaveUserToLocal(user) {
    AuthRoute.win.localStorage.chat_user = JSON.stringify(user);
  }

  removeUserFromLocal() {
    AuthRoute.win.localStorage.clear();
  }

  //phone argument should come with appropraite prefix for country
  async sendSignInLink(email) {
    console.log(email);
    try {
      let resp = await firebase.auth().sendSignInLinkToEmail(email, {
        url: `${AuthRoute.win.location.href}verify-signin`,
        // This must be true.
        handleCodeInApp: true,
      });
      console.log(resp);
      console.log('sent link');
      AuthRoute.win.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      throw error;
    }
  }

  async signInWithLink(email, link = AuthRoute.win.location.href) {
    try {
      if (!(firebase.auth().isSignInWithEmailLink(link) && email))
        throw Error('invalid authetication');
      let resp = await firebase.auth().signInWithEmailLink(email, link);
      console.log(resp.user);
      console.log('sent link');
      this.SaveUserToLocal(resp.user);
    } catch (error) {
      throw error;
    }
  }

  currentUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        }
        reject(null);
      });
    });
  }

  getUser() {
    if (AuthRoute.win.localStorage && AuthRoute.win.localStorage.chat_user) {
      return JSON.parse(AuthRoute.win.localStorage.chat_user);
    }
    return null;
  }

  SignOut() {
    this.removeUserFromLocal();
    firebase.auth().signOut();
  }
}
