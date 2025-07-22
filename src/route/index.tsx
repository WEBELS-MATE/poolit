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
  }
];
