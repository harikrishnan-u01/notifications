const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const notifications = require("./notifications.json")

const app = express();
app.use(bodyParser.json());
app.use(cors());

 
app.get('/', function (req, res) {
    res.send('Welcome to Forge Platform Interview');
});

app.get('/notifications', function (req, res) {
    res.send(notifications);
});

app.post('/notifications', function (req, res) {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).send(newNotification);
});

app.delete('/notifications/:id', function (req, res) {
    const id = req.params.id;
    const index = notifications.findIndex(notification => notification.id === parseInt(id));
    if (index >= 0) {
        notifications.splice(index, 1);
        res.status(204).send()
    } else {
        res.status(404).send()
    }
});

app.listen(8080, () => console.log('server started at port 8080'));