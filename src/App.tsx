import './style/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutPage from './pages/aboutPage';
import AccountPage from './pages/accountPage';
import ErrorPage from './pages/errorPage';
import { NavBar } from './components/NavBar';
import AllBook from './components/allBook';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AllBook/>,
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
