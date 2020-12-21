import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  CardActions,
  CardContent,
  Card,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import classNames from "classnames";
import NotificationService from "../services/notification.service";
import AddNotification from "../addNotification/addNotification";

export default function ListNotifions() {
  const [notifications, setNotifications] = useState();
  const [filteredNotifications, setFilteredNotifications] = useState();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    let res = await NotificationService.getNotifications();
    setNotifications(res.data);
    setFilteredNotifications(res.data);
  };

  const getSelectedNotification = (selected) => {
    if (notifications) {
      console.log("selected ", selected.target.value);
      const severity = selected.target.value;
      if (severity !== "All") {
        const filtered = notifications.filter((item) => {
          return item.severity === severity;
        });

        setFilteredNotifications(filtered);
      } else {
        setFilteredNotifications(notifications);
      }
    }
  };

  const deleteNotification = (item) => {
    NotificationService.deleteNotification(item.id).then(() => {
      getNotifications();
    });
  };

  const showEditNotification = (item) => {
    setIsAdd(true);
    setSelectedNotification(item);
  };

  const showAddNotification = () => {
    setIsAdd(true);
    setSelectedNotification(null);
  };

  const addNotification = async (formData) => {
    if (formData.id) {
      await NotificationService.updateNotification(formData);
    } else {
      formData.id = notifications.length + 1;
      await NotificationService.addNotification(formData);
    }
    getNotifications();
    setIsAdd(false);
  };

  const cancelNotification = () => {
    setIsAdd(false);
  };

  const isNotificationsExists = () => {
    return filteredNotifications && filteredNotifications.length > 0;
  };

  return (
    <Fragment>
      {isAdd ? (
        <Container fixed>
          <AddNotification
            selectedNotification={selectedNotification}
            add={(formData) => addNotification(formData)}
            cancel={() => cancelNotification()}
          ></AddNotification>
        </Container>
      ) : (
        <Container fixed>
          <div className="notificationfilter-container">
            <span>
              <label className="notification-severity-filter-label">
                Filter By:
              </label>
              <select
                className="notification-severity-filter"
                name="selectedTitle"
                id="titles"
                onChange={(selected) => getSelectedNotification(selected)}
              >
                <option value="All" key="All">
                  All
                </option>
                <option key={1} value={1}>
                  Info
                </option>
                <option key={2} value={2}>
                  Warning
                </option>
                <option key={3} value={3}>
                  Severe
                </option>
              </select>
            </span>
            <span className="notification-add">
              <Button
                variant="contained"
                color="primary"
                onClick={() => showAddNotification()}
              >
                Add Notifications
              </Button>
            </span>
          </div>
          {isNotificationsExists() ? (
            filteredNotifications.map((item) => {
              return (
                <Card
                  className="notification-card-container"
                  variant="outlined"
                  key={item.id}
                >
                  <CardContent
                    className={classNames(
                      "notification-card-content-container",
                      {
                        "notification-card-content-severe":
                          item.severity === "3",
                        "notification-card-content-warning":
                          item.severity === "2",
                        "notification-card-content-info": item.severity === "1",
                      }
                    )}
                  >
                    <CardActions className="notification-card-delete">
                      <Button
                        size="small"
                        onClick={() => deleteNotification(item)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </CardActions>
                    <CardActions className="notification-card-delete">
                      <Button
                        size="small"
                        onClick={() => showEditNotification(item)}
                      >
                        <EditIcon />
                      </Button>
                    </CardActions>
                    <Typography variant="h5" component="h2">
                      {" "}
                      {item.title}{" "}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="notification-card-container" variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  No notifications !!!{" "}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Container>
      )}
    </Fragment>
  );
}
