import React from 'react';
import { createBrowserRouter, Outlet, type RouteObject } from 'react-router-dom';

import { HomePage } from './page';
import { UploadPage } from './upload/page';
import { Layout } from 'root/Layout';

export const routes = {
  home: '/',
  upload: '/upload',
} as const;


export const nestedRoutes: RouteObject[] = [
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.upload,
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
