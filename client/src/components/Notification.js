import React, { useState, useEffect } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/notifications");
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await fetch(`http://localhost:5000/api/v1/notifications/${notificationId}`, { method: "DELETE" });
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((notification) => (
        <div key={notification._id}>
          <p>{notification.text}</p>
          <button onClick={() => handleDeleteNotification(notification._id)}>Delete</button>
        </div>
      ))}
      {notifications.length === 0 && <p>No notifications found.</p>}
    </div>
  );
}

export default Notifications;
