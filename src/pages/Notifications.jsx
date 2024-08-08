import React, { useState, useEffect } from 'react';
import NotificationList from '../components/Notifications/NotificationList';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('most-recent');

  useEffect(() => {
    fetch('http://localhost:4000/api/notifications')
      .then(response => response.json())
      .then(data => {
        setNotifications(data.filter(notification => notification.active));
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  const handleDismiss = (id) => {
    // Make API call to mark notification as dismissed
    fetch(`http://localhost:4000/api/notifications/${id}/dismiss`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(() => {
        setNotifications(notifications.filter(notification => notification._id !== id));
      })
      .catch(error => console.error('Error dismissing notification:', error));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="lg:pl-64">

      <div className="my-5 flex h-16 shrink-0 items-center justify-between bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue mr-4">Notifications</h1>
          <div className="flex items-center justify-center w-8 h-8 bg-customBlue text-white font-bold rounded-lg space-x-8">
            {notifications.length}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 w-full">
        <div className="flex space-x-4 mb-6 w-full">
          <input
            type="text"
            placeholder="Filter..."
            className="border rounded-md w-full py-3 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={filter}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            className="rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <select
            className="rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="most-recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="bg-white rounded-lg max-h-[82vh] overflow-y-auto w-full">
          <NotificationList notifications={notifications} filter={filter} sortOrder={sortOrder} onDismiss={handleDismiss} />
        </div>
      </div>
    </div>
  );
};

export default Notifications;