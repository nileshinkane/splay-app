import React from 'react';
import { Route, Switch } from 'react-router-dom';


//Import Components here
import IndexComponent from '../components/IndexComponent/IndexComponent';
// import VideoPlay from './components/VideoPlay';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminComponents/AdminPanel';
import PrivateRoute from '../components/_generic/PrivateRoute';
import VideoPlay from '../components/VideoPlay';
import AddVideoForm from '../components/AdminComponents/Forms/AddVideoForm';
import SideComponent from '../components/_generic/SideComponent';
import VideoList from '../components/_generic/VideoList';

// import PrivateRoute from '../components/_generic/PrivateRoute'


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/login" component={AdminLogin} />
            <Route path="/cse" component={Cse} />
            <Route path="/v" component={VideoPlay} />
            <Route path="/it" component={It} />

            <PrivateRoute exact path="/adminPanel">
                <AdminPanel />
            </PrivateRoute>
            <PrivateRoute exact path="/addVideo">
                <AddVideoForm />
            </PrivateRoute>

            <PrivateRoute exact path="/videoList">
                <VideoList />
            </PrivateRoute>
        </Switch>
    )
}

export default Routes;



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
