import { ComponentType, lazy } from 'react';
interface Route {
  path: string;
  component: ComponentType;
  isProtected?: boolean;
}
export const routes: Route[] = [
  {
    path: '/',
    component: lazy(() => import('../components/pages/dashboard')),
    isProtected: true,
  },
  {

    path: '/login',
    component: lazy(() => import('../components/pages/login')),
    isProtected: false,
  },
  {
    path: '/split-bill',
    component: lazy(() => import('../components/pages/split-bill')),
    isProtected: true,
  },
  {
    path: '/profile',
    component: lazy(() => import('../components/pages/profile')),
    isProtected: true,
  }
];
