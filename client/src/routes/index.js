import React from 'react';
import { Route } from 'react-router-dom';


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
import Department from '../components/Department/Department'
import Navbar from '../components/Navbar';
import VideoCard from '../components/_generic/VideoCard';
import Search from '../components/Search';

// import PrivateRoute from '../components/_generic/PrivateRoute'


const Routes = () => {
    return (
        <>
            <Route to="/" component={Navbar} />
            <Route exact path="/" component={IndexComponent} />
            <Route exact path="/login" component={AdminLogin} />
            <Route path="/v" component={VideoPlay} />
            <Route path="/it" component={It} />
            <Route path="/dept/:deptName" component={Department} />
            <Route path="/search" component={Search} />


            <PrivateRoute exact path="/adminPanel">
                <AdminPanel />
            </PrivateRoute>
            <PrivateRoute exact path="/addVideo">
                <AddVideoForm />
            </PrivateRoute>

            <PrivateRoute exact path="/videoList">
                <VideoList />
            </PrivateRoute>
        </>
    )
}

export default Routes;



const Seach = (props) => {
    return (
        <SideComponent>
            <div style={{ color: 'white' }}>{props.match.params.passed.split("+").join(" ")}</div>
        </SideComponent>
    )
}
const It = () => {
    return (
        <SideComponent>
            <VideoCard type="long" />
        </SideComponent>
    )
}
