import { PageAuth } from '__cli/modules/auth';
import { LayoutDesktop } from '__cli/core/layouts';
import { PageHome } from '__cli/modules/home';
import { PageProfile } from '__cli/modules/profiles';

const routes = [
  { path: '/login', name: 'login', component: PageAuth },
  {
    path: '/desktop',
    component: LayoutDesktop,
    children: [
      { path: '/home', name: 'home', component: PageHome },
      { path: '/profile', name: 'profile', component: PageProfile }
    ]
  }
];

export { routes };
