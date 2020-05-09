import { PageSplash } from '__cli/core/layouts';
import { LayoutDesktop } from '__cli/core/desktop';
import { PageAuth, PageAccount, PageUnverified } from '__cli/core/auth';
import { PageRun, PageNewJob, PageEditJob, PageListJobs } from '__cli/modules/jobs';

const routes = [
  { path: '/unsolved', name: 'unsolved', component: PageSplash },
  { path: '/login', name: 'login', component: PageAuth },
  { path: '/unverified', name: 'unverified', component: PageUnverified },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/run', name: 'run', component: PageRun },
      { path: '/jobs', name: 'jobs', component: PageListJobs },
      { path: '/jobs/new', name: 'job-new', component: PageNewJob },
      { path: '/jobs/edit/:id', name: 'job-edit', component: PageEditJob, props: true },
      { path: '/account', name: 'account', component: PageAccount }
    ]
  }
];

export { routes };
