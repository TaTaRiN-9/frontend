import './style/App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import About from './pages/aboutPage';
import AccountPage from './pages/accountPage';
import { NavBar } from './components/NavBar';
import AllBook from './components/allBook';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className='App'>
      <NavBar/>
        <Routes>
          <Route path='/' element={<AllBook/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/account' element={<AccountPage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
