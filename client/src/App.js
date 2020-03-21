import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar/Sidebar';
import { AdminContext } from './Contexts/AdminContext';

import Routes from './routes/index';
import { SnackbarContext } from './Contexts/SnackbarContext';


function App() {
  const getAdmin = () => localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : null
  const [admin, setAdmin] = useState(getAdmin())
  const [snackbar, setSnackbar] = useState(null)

  return (
    <div className="App">
      <Router>
        <div>
          <AdminContext.Provider value={{ admin, setAdmin }}>
            <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
              <Navbar />
              <Sidebar />
              <BottomNav />
              <Routes />
            </SnackbarContext.Provider>
          </AdminContext.Provider>
        </div>
      </Router>

    </div>
  );
}



export default App;
