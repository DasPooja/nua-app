import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ProductList from '../pages/ProductList/ProductList';
import ProductDetail from '../pages/ProductDetail/ProductDetail';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
    ],
  }
]);