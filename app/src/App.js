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
      axios.get(`http://localhost:8080/notifications`)
      .then(res => {
        this.notifications = res.data;
        this.setState({ filteredNotifications: this.notifications });
      });
    };

    getSelectedNotification(selected) {
      console.log("selected ", selected.target.value);
      const selectedId = selected.target.value;
      if(selectedId !== "All"){
        const filtered = this.notifications.filter((item)=> {
          console.log("item.item --> ", item.id);
          return item.id == selectedId;
        });

        this.setState({filteredNotifications: filtered});
      } else {
        this.setState({filteredNotifications: this.notifications});
      }               
    };

    deleteNotification(item){ 
      const filtered = this.state.filteredNotifications.filter((notification)=> {
        return notification.id !== item.id;
      });
      this.setState({filteredNotifications: filtered});
     };

    render() { 
      return (
      <div style={styles.main}>
        <div style={{marginBottom: "5rem"}}>
          <span>
              <label style={{fontWeight: "bold"}}>Filter By:</label>
              <select style={{height: "2rem"}} name="selectedTitle" id="titles" onChange={(selected)=> this.getSelectedNotification(selected)}>
                <option value="All" key="All">All</option>
              {
                 this.notifications ? this.notifications.map((item) => {
                 return <option key={item.id} value={item.id}>{item.title}</option>
                 }) : null
              }
            </select>
            </span>
            <span style={{float: 'right'}}> <Button variant="contained" color="primary">Add Notifications</Button></span>
          </div>
          {
            this.state.filteredNotifications ? this.state.filteredNotifications.map((item)=> {
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
            }) : "Processing ..."
          }
      </div>
    );
  }

}

export default App;
