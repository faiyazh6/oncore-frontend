import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications, filter, sortOrder, onDismiss }) => {
  let filteredNotifications = notifications;

  if (filter) {
    filteredNotifications = notifications.filter((notification) =>
      notification.notification_name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  if (sortOrder === 'oldest') {
    filteredNotifications = filteredNotifications.sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
  } else if (sortOrder === 'most-recent') {
    filteredNotifications = filteredNotifications.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
  }

  return (
    <div>
      {filteredNotifications.map((notification) => (
        <NotificationItem key={notification._id} notification={notification} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default NotificationList;