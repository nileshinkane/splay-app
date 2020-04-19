import React, { useEffect, useState } from "react";
import SideComponent from "../_generic/SideComponent";
import DeptName from "./DeptName";
import DeptFeatured from "./DeptFeatured";
import DeptAbout from "./DeptAbout";
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles(theme => ({
//     fullWH: {
//         height: '100%',
//         width: '100%'
//     }
// }))




function Department(props) {



    const [state, setState] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/dept/${props.match.params.deptName}`, {
            method: 'GET',
            Accept: 'application/json',
            "Content-type": "application/json"
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setState(data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [props.match.params.deptName]);


    return (
        <SideComponent>
            {state ? <DeptName intro={state.dept.description}  {...props} /> : <DeptNameSkeleton />}
            {state ? <DeptFeatured videos={state} {...props} /> : <DeptFeaturedSkeleton />}
            <DeptAbout {...props} />
        </SideComponent>
    );
}




const DeptNameSkeleton = () => {
    if (window.innerWidth < 500) {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rect" width={350} height={200} />
            </div>
        )
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Skeleton variant="rect" height={250} width={350} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                flex: '1',
                marginLeft: '100px'
            }}>
                <Skeleton variant="rect" height={50} width={300} />
                <Skeleton variant="rect" height={180} width={500} style={{ marginTop: '20px' }} />
            </div>
        </div>
    )
}

const DeptFeaturedSkeleton = () => {

    if (window.innerWidth < 500) {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Skeleton variant="rect" width={350} height={200} />
            </div>
        )
    }
    return (
        <div style={{ marginTop: '90px' }}>
            <Skeleton variant="rect" height={30} width={100} />
            <Grid container spacing={4} style={{ width: '100%', marginTop: '20px' }}>
                <Grid item lg={3}>
                    <Skeleton variant="rect" height={150} width={250} />
                </Grid>
                <Grid item lg={3}>
                    <Skeleton variant="rect" height={150} width={250} />
                </Grid>
                <Grid item lg={3}>
                    <Skeleton variant="rect" height={150} width={250} />
                </Grid>
                <Grid item lg={3}>
                    <Skeleton variant="rect" height={150} width={250} />
                </Grid>
            </Grid>
        </div>
    )
}


export default Department;

