import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
  sendEmailVerification,
  FacebookAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { MyFetchInterface } from "../../interfaces/MyFetchInterface";
import { CookiesHandler } from "../../src/utils/CookiesHandler";
import Router from "next/router";

export class SocialLogin {
  static initFirebase() {
    const configs = {
      apiKey: process.env["NEXT_PUBLIC_API_KEY"],
      authDomain: process.env["NEXT_PUBLIC_AUTH_DOMAIN"],
      projectId: process.env["NEXT_PUBLIC_PROJECT_ID"],
      storageBucket: process.env["NEXT_PUBLIC_STORAGE_BUCKET"],
      messagingSenderId: process.env["NEXT_PUBLIC_MESSAGING_SENDER_ID"],
      appId: process.env["NEXT_PUBLIC_APP_ID"],
      // apiKey: "AIzaSyBkOKjseKpoM0DuYR6mdm1HEPtGIShuR8Q",
      // authDomain: "ecommerce-3dcd5.firebaseapp.com",
      // projectId: "ecommerce-3dcd5",
      // storageBucket: "ecommerce-3dcd5.appspot.com",
      // messagingSenderId: "105572754219",
      // appId: "1:105572754219:web:11852ba2f50a6f9232db6e"
    };
    initializeApp(configs);
    // const db = getFirestore(initializeApp(configs));
    // return db
  }

  static async onAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  // Import the functions you need from the SDKs you need

  static async signUpWithEmailPassword(
    displayName: any,
    email: any,
    password: any
  ): Promise<MyFetchInterface> {
    return new Promise((resolve) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          if (!auth.currentUser) {
            return;
          }
          updateProfile(auth.currentUser, {
            displayName: displayName,
          })
            .then(() => {})
            .catch((error) => {});
          resolve({
            res: authUser,
            err: null,
          });
        })

        .catch((error) => {
          console.log("repoo", error);
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            resolve({
              res: null,
              err: "Email already exists",
            });
          } else if (
            error.message === "Firebase: Error (auth/invalid-email)."
          ) {
            resolve({
              res: null,
              err: "Invalid Email",
            });
          } else if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            resolve({
              res: null,
              err: "Internet not available",
            });
          } else {
            resolve({
              res: null,
              err: error.message,
            });
          }
        });
    });
  }

  static async sendEmail() {
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  static async loginWithEmailPassword(
    email: any,
    password: any
  ): Promise<MyFetchInterface> {
    return new Promise((resolve) => {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log("loginWithEmailPassword", result);
          resolve({
            res: result,
            err: null,
          });
        })
        .catch((error) => {
          console.log("repoo", error);
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            resolve({
              res: null,
              err: "Not Registerd",
            });
          } else if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            resolve({
              res: null,
              err: "Internet not available",
            });
          } else if (
            error.message === "Firebase: Error (auth/invalid-email)."
          ) {
            resolve({
              res: null,
              err: "Invalid Email",
            });
          } else if (
            error.message === "Firebase: Error (auth/wrong-password)."
          ) {
            resolve({
              res: null,
              err: "Wrong Password",
            });
          } else {
            resolve({
              res: null,
              err: error.message,
            });
          }
        });

      //     createUserWithEmailAndPassword(auth, email, password)
      //         // .then(response => { console.log('repoo', response) })
      //         .then((result) => {
      //             console.log('res', result)
      //             resolve({
      //                 res: result,
      //                 err: null
      //             })
      //         })
      //         .catch(error => {
      //             console.log('repoo', error)
      //             if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
      //                 resolve({
      //                     res: null,
      //                     err: 'Email already exists'
      //                 });
      //             }
      //             else {
      //                 resolve({
      //                     res: null,
      //                     err: error.message
      //                 });
      //             }

      //         })
    });
  }
  static async loginWithEmailPasswordAfterServerError() {
    // return new Promise((resolve) => {
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }
    auth.currentUser
      .delete()
      .then((res) => {
        // User deleted.
      })
      .catch((error) => {
        // An error happened.
      });
    // })
  }

  static async forgetEmail(email: any): Promise<void> {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("hhhh");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("kikii", error.message);
        // ..
      });
  }

  static async loginWithGoogle(): Promise<{
    token: string | undefined;
    user: User;
  }> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("result", result);
    console.log("credential", credential);
    const token = credential?.accessToken;
    const user = result.user;
    return {
      token,
      user,
    };
  }
  static async loginWithFacebook(): Promise<{
    token: string | undefined;
    user: User;
    photoUrl: string | undefined;
  }> {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    const photoUrl = `${user?.photoURL}?height=500&access_token=${token}`;

    return {
      token,
      user,
      photoUrl,
    };
  }
  static async logOut(): Promise<void> {
    console.log("loggedout");
    const auth = getAuth();
    await signOut(auth);
    CookiesHandler.removeAccessToken();
    localStorage.clear();
    sessionStorage.clear();
    Router.push("/");
  }
  // -----------------------------------
  static async updateLoggedInUserProfile(
    slug: string | undefined,
    userProfile: {
      fullName: string;
      avatar: string;
    }
  ): Promise<MyFetchInterface> {
    return new Promise((resolve) => {
      const auth = getAuth();
      if (!auth.currentUser) {
        resolve({
          res: null,
          err: "User not signed in",
        });
        return;
      }
      updateProfile(auth.currentUser, {
        displayName: userProfile.fullName,
        photoURL: userProfile.avatar,
      })
        .then(() => {
          resolve({
            res: "Profile updated",
            err: null,
          });
        })
        .catch((error) => {
          resolve({
            res: null,
            err: "An error occurred. Please try again.",
          });
        });
    });
  }
  // ----------------pass change-------//
  static async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<MyFetchInterface> {
    return new Promise((resolve) => {
      const auth = getAuth();

      if (!auth.currentUser) {
        resolve({
          res: null,
          err: "User not signed in",
        });
        return;
      }

      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, oldPassword);

      reauthenticateWithCredential(auth.currentUser, credential).catch(
        (error) => {
          resolve({
            res: null,
            err: "Wrong Password",
          });
        }
      );

      updatePassword(user, newPassword)
        .then(() => {
          resolve({
            res: "password updated",
            err: null,
          });
        })
        .catch((error) => {
          resolve({
            res: null,
            err: "An error occurred. Please try again.",
          });
        });
    });
  }
  // ----------------pass change-------//
}
