import { lazy } from 'react';
import { createBrowserRouter, Outlet, type RouteObject } from 'react-router-dom';
import { Layout } from 'root/Layout';
import { Routes } from 'constants/route.constant';

const HomePage = lazy(() => import('./page').then(module => ({ default: module.HomePage })));
const UploadPage = lazy(() =>
  import('./uploadImage/page').then(module => ({ default: module.UploadPage }))
);
const RepoBrowser = lazy(() =>
  import('./RepoBrowser/RepoBrowser').then(module => ({ default: module.RepoBrowser }))
);
const LoginCallback = lazy(() =>
  import('./LoginCallback/page').then(module => ({ default: module.LoginCallback }))
);

export const nestedRoutes: RouteObject[] = [
  {
    path: Routes.home,
    element: <HomePage />,
  },
  {
    path: Routes.uploadImage,
    element: <UploadPage />,
  },
  {
    path: Routes.repoBrowser,
    element: <RepoBrowser />,
  },
];

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: nestedRoutes,
    },
    {
      path: Routes.loginCallback,
      element: <LoginCallback />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);
