import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
// import Category from "../page/Category/Category";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import Signup from "../page/Signup/Signup";
import Offer from "../page/Offer/Offer";
import ErrorPage from "../ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import AdminRoute from "./AdminRoute";
import AdminHome from "../page/Profile/AdminHome/AdminHome";
import UserHome from "../page/Profile/UserHome/UserHome";
import AddProduct from "../components/AddProduct/AddProduct";
import MyProducts from "../page/Profile/MyProducts/MyProducts";
import UpdateProduct from "../components/UpdateProduct/UpdateProduct";
import ProductDetails from "../page/Details/ProductDetails";
import Cart from "../page/Profile/Cart/Cart";
import AllUsers from "../page/Profile/AllUsers/AllUsers";
import Products from "../page/Products/Products";
import SellerRoute from "./SellerRoute";
import SellerHome from "../page/Profile/SellerHome/SellerHome";
import AdminProducts from "../page/Profile/AdminProducts/AdminProducts";
import AdminAddProduct from "../components/AdminAddProduct/AdminAddProduct";
import AdminUpdateProduct from "../components/AdminUpdateProduct/AdminUpdateProduct";

// import Product from "../page/ProductSearch/Product";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // loader: () => fetch('https://online-camera-shop-server.vercel.app/product')
        // loader: () => fetch('http://localhost:5000/product')
      },
      // {
      //   path: "/category",
      //   element: <Category></Category>
      // },
      {
        path: "/offer",
        element: <Offer></Offer>
      },
      {
        path: "/products",
        element: <Products></Products>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: '/details/:_id',
        element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
        // loader: () => fetch(`https://online-camera-shop-server.vercel.app/product`)
        loader: () => fetch(`http://localhost:5000/product`)
      }

    ]
  },

  {
    path: 'profile',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // Normal User Route
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },

      // Admin Route
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'adminAddProduct',
        element: <AdminRoute><AdminAddProduct></AdminAddProduct></AdminRoute>
      },
      {
        path: 'adminProducts',
        element: <AdminRoute><AdminProducts></AdminProducts></AdminRoute>
      },
      {
        path: 'adminUpdateProduct/:id',
        element: <AdminRoute><AdminUpdateProduct></AdminUpdateProduct></AdminRoute>,
        // loader: ({ params }) => fetch(`https://online-camera-shop-server.vercel.app/product/${params.id}`)
        loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)
      },

      // Seller Route
      {
        path: 'sellerHome',
        element: <SellerRoute><SellerHome></SellerHome></SellerRoute>
      },
      {
        path: 'addProduct',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: 'myProducts',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: 'updateProduct/:id',
        element: <SellerRoute><UpdateProduct></UpdateProduct></SellerRoute>,
        // loader: ({ params }) => fetch(`https://online-camera-shop-server.vercel.app/product/${params.id}`)
        loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)
      }
    ]
  }
]);

export default router;