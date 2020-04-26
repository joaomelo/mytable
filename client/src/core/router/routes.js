import { PageSplash } from '__cli/core/init';

const routes = [
  { path: '/', name: 'splash', component: PageSplash },
  { path: '/login', name: 'login', component: lazyLoadFor('PageAuth') },
  { path: '/unverified', name: 'unverified', component: lazyLoadFor('PageUnverified') },
  {
    path: '/desktop',
    component: lazyLoadFor('LayoutDesktop'),
    children: [
      { path: '/home', name: 'home', component: lazyLoadFor('PageHome') },
      { path: '/jobs', name: 'jobs', component: lazyLoadFor('PageJobs') },
      { path: '/job/:id', name: 'job', component: lazyLoadFor('PageJob'), props: true }
    ]
  }
];

function lazyLoadFor (componentName) {
  const mapComponentNameToModule = {
    PageAuth: () => import('__cli/core/auth'),
    PageUnverified: () => import('__cli/core/auth'),
    LayoutDesktop: () => import('__cli/core/layouts'),
    PageHome: () => import('__cli/core/layouts'),
    PageJobs: () => import('__cli/modules/jobs'),
    PageJob: () => import('__cli/modules/jobs')
  };

  const loadFunction = async () => {
    const module = await mapComponentNameToModule[componentName]();
    const component = module[componentName];
    return component;
  };

  return loadFunction;
};

export { routes };
