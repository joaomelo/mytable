import { PageAuth } from '__cli/core/auth';
import { LayoutDesktop, PageHome } from '__cli/core/layouts';
import { PageJobs, PageJob } from '__cli/modules/jobs';

const routes = [
  { path: '/login', name: 'login', component: PageAuth },
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
