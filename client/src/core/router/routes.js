import { LayoutDesktop, PageSplash, PageHome } from '__cli/core/layouts';
import { PageAuth, PageUnverified } from '__cli/core/auth';
import { PageJobs, PageJob } from '__cli/modules/jobs';

const routes = [
  { path: '/', name: 'splash', component: PageSplash },
  { path: '/login', name: 'login', component: PageAuth },
  { path: '/unverified', name: 'unverified', component: PageUnverified },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/home', name: 'home', component: PageHome },
      { path: '/jobs', name: 'jobs', component: PageJobs },
      { path: '/job/:id', name: 'job', component: PageJob, props: true }
    ]
  }
];

export { routes };
