import { PageSplash } from '__cli/core/layouts';
import { LayoutDesktop } from '__cli/core/desktop';
import { PageAuth, PageUnverified } from '__cli/core/auth';
import { PageRun, PageEditJob } from '__cli/modules/jobs';

const routes = [
  { path: '/unsolved', name: 'unsolved', component: PageSplash },
  { path: '/login', name: 'login', component: PageAuth },
  { path: '/unverified', name: 'unverified', component: PageUnverified },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/run', name: 'run', component: PageRun },
      { path: '/job', name: 'job', component: PageEditJob }
    ]
  }
];

export { routes };
