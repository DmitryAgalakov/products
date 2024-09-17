import { createBrowserRouter, redirect } from 'react-router-dom';
import { Layout } from '../../Layout';
import { ErrorPage } from './ErrorPage';
import { ProductsView } from '../../pages/products/ProductsView/ProductsView';
import { ProductInfo } from '../../pages/products/ProductInfo/ProductInfo';
import { ProductCreate } from '../../pages/products/ProductCreate/ProductCreate';
import { ProductEdit } from '../../pages/products/ProductEdit/ProductEdit';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: async () => redirect('/products'),
      },
      {
        path: 'products',
        element: <ProductsView />,
      },
      {
        path: 'products/:productId',
        element: <ProductInfo />,
      },
      {
        path: 'products/create',
        element: <ProductCreate />,
      },
      {
        path: 'products/edit/:productId',
        element: <ProductEdit />,
      },
    ],
  },
]);
