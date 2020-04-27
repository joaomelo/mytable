import { LayoutDesktop, PageSplash } from '__cli/core/layouts';
import { PageAuth, PageUnverified } from '__cli/core/auth';
import { PageRun, PageJobs, PageJob } from '__cli/modules/jobs';

const routes = [
  { path: '/unsolved', name: 'unsolved', component: PageSplash },
  { path: '/login', name: 'login', component: PageAuth },
  { path: '/unverified', name: 'unverified', component: PageUnverified },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/run', name: 'run', component: PageRun },
      { path: '/jobs', name: 'jobs', component: PageJobs },
      { path: '/job/:id', name: 'job', component: PageJob, props: true }
    ]
  }
];

export { routes };
