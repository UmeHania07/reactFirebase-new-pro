import { Routes, Route } from 'react-router-dom'

//Pages
import Register from './Pages/Register';
import Login from './Pages/Login';
import List from './Pages/List';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Details from './Pages/Details';
//css link
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import MyNavbar from './Components/MyNavbar';





function App() {
  return (
    <div>

      <MyNavbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/list' element={<List />} />
        <Route path='/book/view/:bookId' element={<Details />} />

        <Route path='*' element={<NotFound />} />




      </Routes>
    </div>
  )
}

export default App;
