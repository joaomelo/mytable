import { AuthMech } from '@joaomelo/auth-mech';
import { fireauth } from '__cli/core/firebase';

const authMech = new AuthMech({
  service: fireauth,
  fuse: 'jobs'
});

export { authMech };
