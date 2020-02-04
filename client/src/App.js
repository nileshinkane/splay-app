import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import IndexComponent from './components/IndexComponent/IndexComponent';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
// import VideoPlay from './components/VideoPlay';
import AdminLogin from './components/AdminLogin';
import SideComponent from './components/helpers/SideComponent';
import AdminPanel from './components/AdminPanel.js/AdminPanel';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: pink,
//     error: red,
//     contrastThreshold: 3,
//     tonalOffset: 0.2,
//   },
// });

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" component={Navbar} />
          <Route path="/" component={Sidebar} />
          <Route path="/" component={BottomNav} />

          <Switch>
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/login" component={AdminLogin} />
            <Route exact path="/adminPanel" component={AdminPanel} />
            {/* <Route exact path="/video" component={VideoPlay} /> */}
            <Route path="/cse" component={Cse} />
            <Route path="/it" component={It} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}


const Cse = () => {
  return (
    <SideComponent>
      <div style={{ color: 'white' }}>This is CSE</div>
    </SideComponent>
  )
}
const It = () => {
  return (
    <div>This is It</div>
  )
}

export default App;
