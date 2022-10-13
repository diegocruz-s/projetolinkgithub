import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
    
        <BrowserRouter>
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={!auth ? <Auth /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
