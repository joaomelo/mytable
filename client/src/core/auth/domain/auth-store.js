import { BehaviorSubject } from 'rxjs';
import { fireauth } from '__cli/core/firebase';

const authStore = {
  state: {
    user: null,
    userName: null,
    status: 'UNSOLVED'
  },
  subscribe (observer) {
    authSubject.subscribe(observer);
  }
};

const authSubject = new BehaviorSubject({ ...authStore.state });

fireauth.onAuthStateChanged(user => {
  authStore.state.user = user;

  const email = user ? user.email : '';
  const username = email.substring(0, email.indexOf('@'));
  authStore.state.userName = username;

  if (!user) {
    authStore.state.status = 'SIGNOUT';
  } else {
    authStore.state.status = user.emailVerified ? 'SIGNIN' : 'UNVERIFIED';
  }

  authSubject.next({ ...authStore.state });
});

export { authStore };
