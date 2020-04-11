import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar/Sidebar';


import Routes from './routes/index';

import { AdminContext } from './Contexts/AdminContext';
import { SnackbarContext } from './Contexts/SnackbarContext';
import { DialogBoxContext } from './Contexts/DialogBoxContext';


function App() {
  const getAdmin = () => localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : null
  const [admin, setAdmin] = useState(getAdmin())
  const [snackbar, setSnackbar] = useState(null)
  const [dialog, setDialog] = useState(false)

  return (
    <div className="App" style={{ paddingBottom: '20px' }}>
      <Router>
        <div>
          <AdminContext.Provider value={{ admin, setAdmin }}>
            <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
              <DialogBoxContext.Provider value={{ dialog, setDialog }}>
                <Sidebar />
                <BottomNav />
                <Switch>
                  <Routes />
                </Switch>
              </DialogBoxContext.Provider>
            </SnackbarContext.Provider>
          </AdminContext.Provider>
        </div>
      </Router>

    </div>
  );
}



export default App;
