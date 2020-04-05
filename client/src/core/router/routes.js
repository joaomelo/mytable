import { PageAuth } from '__cli/modules/auth';
import { LayoutDesktop, PageDummy } from '__cli/core/layouts';
import { PageProfile } from '__cli/modules/profiles';

const routes = [
  { path: '/login', name: 'login', component: PageAuth },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/home', name: 'home', component: PageDummy },
      { path: '/profile', name: 'profile', component: PageProfile }
    ]
  }
];

export { routes };
