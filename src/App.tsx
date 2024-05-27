import './style/App.css';
import './style/cardInBasket.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import AccountPage from './pages/accountPage';
import RegisterPage from './pages/registerPage';
import ErrorPage from './pages/errorPage';
import BasketPage  from './pages/basketPage';

import { NavBar } from './components/NavBar';

import { ShoppingBasketProvider } from './context/shoppingBasket'
import LoginPage from './pages/loginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/basket',
    element: <BasketPage />,
  },
  {
    path: '/account',
    element: <AccountPage />
  }
])

const App = () => {

  return (
    <div className='App'>
      <ShoppingBasketProvider>
        <ToastContainer />
        <NavBar/>
        <RouterProvider router={router}/>
      </ShoppingBasketProvider>
    </div>
  );
}

export default App;
