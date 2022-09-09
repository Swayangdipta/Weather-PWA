import React from 'react';
import './App.css';
import {LocationProvider} from './Context/LocationContext';
import {WeatherProvider} from './Context/WeatherContext';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <WeatherProvider>
    <ToastContainer />
    <LocationProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </LocationProvider>
    </WeatherProvider>
  );
}

export default App;
