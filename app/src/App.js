import React, { Fragment } from 'react';
import {Container, Typography, CardActions, CardContent, Card, Button} from '@material-ui/core';
import { EditIcon, DeleteForeverIcon } from '@material-ui/icons';   
import classNames from 'classnames';
import './App.css';
import NotificationService from './services/notification.service';
import AddNotification from './addNotification/addNotification';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        isAdd: false,
        selectedNotification: null
      }
    };

    componentDidMount() {
      this.getNotifications();
    };

    async getNotifications() {
      let res = await NotificationService.getNotifications();
      this.notifications = res.data;
      this.setState({ filteredNotifications: this.notifications });
    };

    getSelectedNotification(selected) {
      console.log("selected ", selected.target.value);
      const severity = selected.target.value;
      if(severity !== "All"){
        const filtered = this.notifications.filter((item)=> {
          return item.severity === severity;
        });

        this.setState({filteredNotifications: filtered});
      } else {
        this.setState({filteredNotifications: this.notifications});
      }               
    };

    deleteNotification(item){ 
      NotificationService.deleteNotification(item.id).then(() => {
        this.getNotifications();
      });
     };

    showEditNotification(item) {
      this.setState({
        isAdd: true,
        selectedNotification: item 
      });
    };

    showAddNotification() {
      this.setState({
        isAdd: true,
        selectedNotification: null 
      });
    }

    async addNotification (formData) {
       if(formData.id){
        await NotificationService.updateNotification(formData);
       } else {
          formData.id = this.notifications.length + 1;
          await NotificationService.addNotification(formData);
       }
       this.getNotifications();
       this.setState({
         isAdd : false
       });
    }

    cancelNotification () {
      this.setState({
        isAdd : false
      });
    }

     isNotificationsExists() {
      return this.state.filteredNotifications && this.state.filteredNotifications.length > 0
     }

    render() { 
      return (
      <Fragment>
        {
          this.state.isAdd ?
          <Container fixed>
            <AddNotification 
              selectedNotification={this.state.selectedNotification} 
              add={(formData) => this.addNotification(formData)}
              cancel={() => this.cancelNotification()}
            >
            </AddNotification>
          </Container>  
          :
          <Container fixed>
            <div className="notificationfilter-container">
              <span>
                  <label className="notification-severity-filter-label">Filter By:</label>
                  <select className="notification-severity-filter" name="selectedTitle" id="titles" 
                    onChange={(selected)=> this.getSelectedNotification(selected)}>
                    <option value="All" key="All">All</option>
                    <option key={1} value={1}>Info</option>
                    <option key={2} value={2}>Warning</option>
                    <option key={3} value={3}>Severe</option>
                </select>
                </span>
                <span className="notification-add"> 
                  <Button variant="contained" color="primary" onClick={
                    () => this.showAddNotification()
                  }>Add Notifications</Button>
                </span>
              </div>
              {
                this.isNotificationsExists() ? this.state.filteredNotifications.map((item)=> {
                  return  <Card className="notification-card-container" variant="outlined" key={item.id}>            
                    <CardContent className={classNames("notification-card-content-container", 
                    {
                      "notification-card-content-severe": item.severity === "3",
                      "notification-card-content-warning": item.severity === "2",
                      "notification-card-content-info": item.severity === "1"
                    })}> 
                      <CardActions className="notification-card-delete">
                        <Button size="small" onClick={() => this.deleteNotification(item)}><DeleteForeverIcon /></Button>
                      </CardActions>
                      <CardActions className="notification-card-delete">
                        <Button size="small" onClick={() => this.showEditNotification(item)}><EditIcon /></Button>
                      </CardActions>
                      <Typography variant="h5" component="h2"> {item.title} </Typography>  
                      <Typography variant="body2" component="p">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                }) : <Card className="notification-card-container" variant="outlined" >            
                      <CardContent> 
                        <Typography variant="h5" component="h2">No notifications !!! </Typography>  
                      </CardContent>
                    </Card>
              }
            </Container>
        }
      </Fragment>  
      
    );
  }

}

export default App;
