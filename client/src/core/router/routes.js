import { PageAuth } from '__cli/modules/auth';
import { LayoutDesktop } from '__cli/core/layouts';
import { PageHome } from '__cli/modules/home';
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
