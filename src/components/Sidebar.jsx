import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  BellIcon,
  SupportIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import Profile from './Authentication/Profile';
import CustomSearchBox from './CustomSearchBox';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Highlight, connectStateResults } from 'react-instantsearch-dom';

const searchClient = algoliasearch('HWIR06EPUT', 'bc157a3b5962cc2d21a132ccf0b6f202');

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { isAuthenticated } = useAuth0();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initial fetch for notifications
    fetch('http://localhost:4000/api/notifications')
      .then(response => response.json())
      .then(data => {
        setNotifications(data.filter(notification => notification.active));
      })
      .catch(error => console.error('Error fetching notifications:', error));

    // WebSocket setup
    const socket = new WebSocket('ws://localhost:4000');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NOTIFICATION_COUNT') {
        fetch('http://localhost:4000/api/notifications')
          .then(response => response.json())
          .then(data => {
            setNotifications(data.filter(notification => notification.active));
          })
          .catch(error => console.error('Error fetching notifications:', error));
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleResultClick = (url) => {
    navigate(url);
  };

  const Hit = ({ hit }) => (
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleResultClick(hit.url)}>
      <h4 className="text-sm font-semibold text-gray-900"><Highlight attribute="title" hit={hit} /></h4>
      <p className="text-xs text-gray-700"><Highlight attribute="content" hit={hit} /></p>
    </div>
  );

  const Results = connectStateResults(({ searchState, searchResults, children }) => (
    searchState && searchState.query
      ? searchResults && searchResults.nbHits !== 0
        ? children
        : <div className="px-4 py-2">No results found.</div>
      : null
  ));

  const navigation = [
    { name: 'Home', href: isAuthenticated ? '/get-started' : '/', icon: HomeIcon },
    { name: 'Schedule Templates', href: '/schedule-templates', icon: ClockIcon },
    { name: 'Daily Calendar', href: '/daily-calendar', icon: CalendarIcon },
    { name: 'Executive Reports', href: '/executive-reports', icon: ChartBarIcon },
    { name: 'Nurse View', href: '/nurse-view', icon: UserGroupIcon },
  ];

  const additionalLinks = [
    { name: 'Notifications', href: '/notifications', icon: BellIcon },
    { name: 'Support', href: '/support', icon: SupportIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <div className={classNames("hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col bg-customBg", className)}>
      <div className="flex grow flex-col gap-y-4 overflow-y-auto px-2 pb-2">
        <div className="flex h-16 items-center px-4 space-x-2">
          <img className="h-8 w-auto" src="/images/oncore.png" alt="Oncore" />
          <span className="font-bold text-xl">Oncore</span>
          <img className="h-6 w-auto" src="/images/ai.png" alt="AI" />
        </div>
        <div className="px-2">
          <InstantSearch searchClient={searchClient} indexName="oncore_ai">
            <CustomSearchBox />
            <div className="mt-1 bg-white rounded-md shadow-lg z-10">
              <Results>
                <Hits hitComponent={Hit} />
              </Results>
            </div>
          </InstantSearch>
        </div>
        <nav className="flex flex-1 flex-col px-4 mt-2">
          <ul className="flex flex-1 flex-col gap-y-4">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={classNames(
                        currentPath === item.href ? 'bg-customBlue text-white shadow-2xl focus:outline-none' : 'text-gray-700 hover:text-customBlue hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer w-full text-left'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          currentPath === item.href ? 'text-white' : 'text-gray-400 group-hover:text-customBlue',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex items-center">
                        {item.name}
                        {item.name === 'Notifications' && notifications.length > 0 && (
                          <span className="ml-2 bg-red-600 text-white rounded-md px-2 py-0.5 text-xs font-bold">
                            {notifications.length}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <ul className="-mx-2 space-y-1">
                {additionalLinks.map((item) => (
                  <li key={item.name} className="relative">
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={classNames(
                        currentPath === item.href ? 'bg-customBlue text-white shadow-2xl focus:outline-none' : 'text-gray-700 hover:text-customBlue hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer w-full text-left'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          currentPath === item.href ? 'text-white' : 'text-gray-400 group-hover:text-customBlue',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex items-center">
                        {item.name}
                        {item.name === 'Notifications' && notifications.length > 0 && (
                          <span className="ml-2 bg-red-600 text-white rounded-md px-2 py-0.5 text-xs font-bold">
                            {notifications.length}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="relative py-4">
                  {isAuthenticated && <Profile />}
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;