import './style/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutPage from './pages/aboutPage';
import AccountPage from './pages/accountPage';
import ErrorPage from './pages/errorPage';
import { NavBar } from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <AboutPage/>
  },
  {
    path: '/account',
    element: <AccountPage/>
  }
])

const App = () => {

  return (
    <div className='App'>
      <NavBar/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
