import React, {Component} from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import "./addNotification.css"

export default class AddNotification extends Component{
    render() {
        return <div className="addNotification-container">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="outlined-basic" label="Notification Text" variant="outlined" />
            </Grid>  
            <Grid item xs={12}>
            <TextField id="outlined-basic" label="Notification Description" variant="outlined" multiline rows={10} rowsMax={10}/>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={
                            () => {
                                this.props.add();
                            }
                        }>Back
                </Button>
            </Grid>
            </Grid>
        </div>;
    }
}