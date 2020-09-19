import axios from 'axios';

export default class NotificationService {
    static getNotifications() {
        return axios.get("/notifications");
    }

    static deleteNotification(id) {
       return axios.delete(`/notifications/${id}`);
    }

    static addNotification(data) {
        return axios.post("/notifications", data);
    }

    static updateNotification(data) {
        return axios.put(`/notifications/${data.id}`, data);
    }    
}