const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");

const notifications = require("./notifications.json")

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "..", "build")));
 
// app.get('/', function (req, res) {
//     res.send('Welcome to Hari App');
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
  });

app.get('/notifications', function (req, res) {
    res.send(notifications);
});

app.post('/notifications', function (req, res) {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).send(newNotification);
});

app.put('/notifications/:id', function (req, res) {
    const id = req.params.id;
    const index = notifications.findIndex(notification => notification.id === parseInt(id));
    if (index >= 0) {
        notifications[index] = req.body;
        notifications[index].id = parseInt(id);
        res.status(200).send()
    } else {
        res.status(404).send()
    }
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