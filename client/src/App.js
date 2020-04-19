import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar/Sidebar';


import Routes from './routes/index';

import { UserContext } from './Contexts/UserContext';
import { SnackbarContext } from './Contexts/SnackbarContext';
import { DialogBoxContext } from './Contexts/DialogBoxContext';


function App() {
  const getUser = () => localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : null
  const [user, setUser] = useState(getUser())
  const [snackbar, setSnackbar] = useState(null)
  const [dialog, setDialog] = useState(false)

  return (
    <div className="App" style={{ paddingBottom: '20px' }}>
      <Router>
        <div>
          <UserContext.Provider value={{ user, setUser }}>
            <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
              <DialogBoxContext.Provider value={{ dialog, setDialog }}>
                <Sidebar />
                <BottomNav />
                <Switch>
                  <Routes />
                </Switch>
              </DialogBoxContext.Provider>
            </SnackbarContext.Provider>
          </UserContext.Provider>
        </div>
      </Router>

    </div>
  );
}



export default App;
