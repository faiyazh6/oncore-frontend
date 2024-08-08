import React from 'react';

const NotificationItem = ({ notification, onDismiss }) => {
  return (
    <div className="bg-customBg shadow-sm rounded-md p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          <span aria-label="icon" className="relative inline-flex items-center justify-center w-12 h-12 shadow-md rounded-full bg-white">
            <span className="text-2xl">{notification.icon}</span>
          </span>
        </div>
        <div>
          <div className="font-bold text-gray-700 mb-2">{notification.notification_name}</div>
          <div className="text-gray-500 mb-2">{notification.description}</div>
          <div className="text-gray-400 text-sm">{notification.time}</div>
        </div>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="text-blue-500 hover:underline">Remove from Schedule</a>
        <button onClick={() => onDismiss(notification._id)} className="text-red-500 hover:underline">Dismiss</button>
      </div>
    </div>
  );
};

export default NotificationItem;