import { ComponentType, lazy } from 'react';
interface Route {
  path: string;
  component: ComponentType;
  isProtected?: boolean;
}
export const routes: Route[] = [
  {
    path: '/',
    component: lazy(() => import('../components/pages/landing-page')),
    isProtected: false,
  },
  {
    path: '/dashboard',
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
  },
  {
    path: '/split-bill/detail/:id',
    component: lazy(() => import('../components/pages/split-bill/detail')),
    isProtected: true,
  },
  {
    path: '/split-bill/create',
    component: lazy(() => import('../components/pages/split-bill/create-bill')),
    isProtected: true,
  },
  {
    path: '/split-bill/create/input-amount',
    component: lazy(() => import('../components/pages/split-bill/input-amount')),
    isProtected: true,
  },
  {
    path: '/split-bill/create/input-item',
    component: lazy(() => import('../components/pages/split-bill/input-item')),
    isProtected: true,
  }

];
