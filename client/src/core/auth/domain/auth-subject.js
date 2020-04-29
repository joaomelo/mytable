import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { fireauth } from '__cli/core/firebase';

const authSubject = new BehaviorSubject({ user: null, status: 'UNSOLVED' });
const usernameSubject = authSubject.pipe(map(({ user }) => {
  const email = user ? user.email : '';
  const username = email.substring(0, email.indexOf('@'));
  return username;
}));

fireauth.onAuthStateChanged(user => {
  const payload = {
    user,
    status: null
  };

  if (!user) {
    payload.status = 'SIGNOUT';
  } else {
    payload.status = user.emailVerified ? 'SIGNIN' : 'UNVERIFIED';
  }

  authSubject.next(payload);
});

export { authSubject, usernameSubject };
