import { lazy } from 'react';
import { createBrowserRouter, Outlet, type RouteObject } from 'react-router-dom';

import { Layout } from 'root/Layout';

const HomePage = lazy(() => import('./page').then((module) => ({ default: module.HomePage })));
const UploadPage = lazy(() => import('./upload/page').then((module) => ({ default: module.UploadPage })));

export enum Routes {
  home = '/',
  uploadImage = '/upload/image',
};

export const nestedRoutes: RouteObject[] = [
  {
    path: Routes.home,
    element: <HomePage />,
  },
  {
    path: Routes.uploadImage,
    element: <UploadPage />,
  },
];

export const router = createBrowserRouter([
	{
		path    : '/',
		element : (
      <Layout>
        <Outlet />
      </Layout>
		),
		children: nestedRoutes,
	},
]);
