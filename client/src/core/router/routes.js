import { PageAuth } from '__cli/modules/auth';
import LayoutDesktop from '__cli/core/layouts/layout-desktop';
import PageDummy from '__cli/core/layouts/page-dummy';

const routes = [
  { path: '/login', name: 'login', component: PageAuth },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/home', name: 'home', component: PageDummy },
      { path: '/preferences', name: 'preferences', component: PageDummy }
    ]
  }
];

export { routes };
