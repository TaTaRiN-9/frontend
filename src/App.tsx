import './style/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './pages/about';
import { NavBar } from './components/NavBar';
import AllBook from './components/allBook';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className='App'>
      <NavBar/>
      <Router>
        <Routes>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/' element={<AllBook/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
