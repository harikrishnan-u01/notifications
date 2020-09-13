import React from 'react';
import axios from 'axios';
import './App.css';
import {Typography, CardActions, CardContent, Card, Button} from '@material-ui/core';

const styles = {
  main : {padding: '2px 16px'},
  card : {
    marginBottom: "2rem"},
    cardHeader : {fontWeight: 'bold'}
}

class App extends React.Component {
    constructor(){
      super();
      this.state = {}
    };

    componentDidMount() {
      this.getNotifications();
    };

    getNotifications() {
      axios.get(`/notifications`)
      .then(res => {
        this.notifications = res.data;
        this.setState({ filteredNotifications: this.notifications });
      });
    };

    getSelectedNotification(selected) {
      console.log("selected ", selected.target.value);
      const severity = selected.target.value;
      if(severity !== "All"){
        const filtered = this.notifications.filter((item)=> {
          console.log("item.item --> ", item.id);
          return item.severity === severity;
        });

        this.setState({filteredNotifications: filtered});
      } else {
        this.setState({filteredNotifications: this.notifications});
      }               
    };

    deleteNotification(item){ 
      axios.delete(`/notifications/${item.id}`)
      .then(() => {
        this.getNotifications();
      });
     };

     isNotificationsExists() {
      return this.state.filteredNotifications && this.state.filteredNotifications.length > 0
     }

    render() { 
      return (
      <div style={styles.main}>
        <div style={{marginBottom: "5rem"}}>
          <span>
              <label style={{fontWeight: "bold"}}>Filter By:</label>
              <select style={{height: "2rem"}} name="selectedTitle" id="titles" 
                onChange={(selected)=> this.getSelectedNotification(selected)}>
                <option value="All" key="All">All</option>
                <option key={1} value={1}>Info</option>
                <option key={2} value={2}>Warning</option>
                <option key={3} value={3}>Severe</option>
            </select>
            </span>
            <span style={{float: 'right'}}> <Button variant="contained" color="primary">Add Notifications</Button></span>
          </div>
          {
            this.isNotificationsExists() ? this.state.filteredNotifications.map((item)=> {
              return  <Card style={styles.card} variant="outlined" key={item.id}>            
                <CardContent style={{borderLeft: "solid 10px", borderLeftColor: item.severity === "3" ? "red" : 
                (item.severity === "2" ? "#e8a830" : "green") } }> 
                  <CardActions style={{float: "right"}}>
                    <Button size="small" onClick={() => this.deleteNotification(item)}>X</Button>
                  </CardActions>
                  <Typography variant="h5" component="h2"> {item.title} </Typography>  
                  <Typography variant="body2" component="p">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            }) : <Card style={styles.card} variant="outlined" >            
                  <CardContent> 
                    <Typography variant="h5" component="h2">No notifications !!! </Typography>  
                  </CardContent>
                </Card>
          }
      </div>
    );
  }

}

export default App;
