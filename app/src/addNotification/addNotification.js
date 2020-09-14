import React, {Component} from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import "./addNotification.css"

export default class AddNotification extends Component{
    formData = {severity: "1"};
    state = {isError: false};
    render() {
        return <div className="addNotification-container">
            <Grid container spacing={2}>
                {
                    this.state.isError ? 
                    <Grid item xs={12}>
                        <p style={{color: 'red'}}>Please enter all mandatory fields</p>
                    </Grid>  : null
                }
                <Grid item xs={12}>
                    <TextField 
                        required 
                        id="outlined-basic" 
                        label="Notification Text" 
                        variant="outlined" 
                        onChange={(e) => {this.formData.title = e.target.value}}
                        value={this.formData.title} />
                </Grid>  
                <Grid item xs={12}>
                    <TextField 
                        required 
                        id="outlined-basic" 
                        label="Notification Description"
                        variant="outlined" 
                        value={this.formData.description} 
                        onChange={(e) => {this.formData.description = e.target.value}}
                        multiline 
                        rows={10} 
                        rowsMax={10}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        required
                        label="Severity"
                        value={this.formData.severity}
                        onChange={(e) => {this.formData.severity = e.target.value}}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select your currency"
                        variant="outlined"
                        >
                        <option key="1" value="1">
                            Info
                        </option>
                        <option key="2" value="2">
                            Warning
                        </option>
                        <option key="3" value="3">
                            Severe
                        </option>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={
                                () => {
                                    if(!this.formData.title || !this.formData.description){
                                        this.setState({isError: true});
                                        return;
                                    }
                                    this.setState({isError: false});
                                    this.props.add(this.formData);
                                }
                            }>Submit
                    </Button>
                </Grid>
            </Grid>
        </div>;
    }
}