import { LayoutDesktop, LayoutShell } from '__cli/core/layouts';
import { PageSplash } from '__cli/core/loader';
import { PageAuth, PageAccount, PageUnverified } from '__cli/core/auth';
import { PageRun, PageEditJob } from '__cli/modules/jobs';

const routes = [
  {
    path: '/shell',
    component: LayoutShell,
    children: [
      { path: '/loading', name: 'loading', component: PageSplash },
      { path: '/login', name: 'login', component: PageAuth },
      { path: '/unverified', name: 'unverified', component: PageUnverified }
    ]
  },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/run', name: 'run', component: PageRun },
      { path: '/job', name: 'job', component: PageEditJob },
      { path: '/account', name: 'account', component: PageAccount }
    ]
  }
];

export { routes };
