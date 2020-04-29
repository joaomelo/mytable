import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '__cli/core/vue'; // will init vue, comes first because of router
import '__cli/core/firebase'; // will init firebase
import { appService } from './app';
import { authSubject } from '__cli/core/auth';

appService.start();
authSubject.subscribe(({ status }) => appService.send(status));
