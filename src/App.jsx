import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './components/Sidebar';
import GetStarted from './pages/GetStarted';
import UploadDoc from './pages/UploadDoc';
import DailyCalendar from './pages/DailyCalendar';
import ScheduleTemplates from './pages/ScheduleTemplates';
import ExecutiveReports from './pages/ExecutiveReports';
import Settings from './pages/Settings';
import RoleSelection from './pages/RoleSelection';
import Support from './pages/Support';
import SubmitTicket from './pages/SubmitTicket';
import ArticleDetail from './pages/ArticleDetail';
import AllPosts from './pages/AllPosts';
import Notifications from './pages/Notifications';
import NurseView from './pages/NurseView';
import ErrorPage from './pages/ErrorPage';
import Identify from './pages/Identify';
import Welcome from './pages/Welcome';

function App() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMetadata, setUserMetadata] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/get-started';

  return (
    <div className="App flex">
      {showSidebar && <Sidebar notificationsCount={notificationsCount} />}
      <div className="content flex-grow">
        {children}
      </div>
    </div>
  );
};

  const fetchUserMetadata = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_API_IDENTIFIER,
          scope: "read:current_user",
        },
        cacheMode: 'off',
      });

      const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserMetadata(data.user_metadata);
        return data.user_metadata;
      } else {
        console.error('Failed to Get User Details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNotificationsCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/notifications');
      const data = await response.json();
      setNotificationsCount(data.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const checkUserRole = async () => {
      if (location.pathname !== '/role-selection' && isAuthenticated && user && !userMetadata) {
        const metadata = await fetchUserMetadata();
        if (metadata && metadata.description) {
          setUserMetadata(metadata);
        } else {
          navigate('/role-selection');
        }
      }
    };
    checkUserRole();
    if (isAuthenticated) {
      fetchNotificationsCount();
    }
  }, [isAuthenticated, user, location.pathname, navigate, userMetadata]);

  useEffect(() => {
    if (isAuthenticated && userMetadata?.description && location.pathname === '/role-selection') {
      navigate('/');
    }
  }, [isAuthenticated, userMetadata, location.pathname, navigate]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/get-started') {
      navigate('/');
    // } else if (!isAuthenticated && (location.pathname === '/daily-calendar' || 
    //                                 location.pathname === '/upload-doc' ||
    //                                 location.pathname === '/schedule-templates' ||
    //                                 location.pathname === '/executive-reports' ||
    //                                 location.pathname === '/settings' ||
    //                                 location.pathname === '/role-selection' ||
    //                                 location.pathname === '/support' ||
    //                                 location.pathname === '/notifications' ||
    //                                 location.pathname === '/support/articles' ||
    //                                 location.pathname === '/nurse-view' ||
    //                                 location.pathname === '/error'
    //                                 )) {
    //   navigate('/get-started');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Layout>
        <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/daily-calendar" element={<DailyCalendar />} />
        <Route path="/schedule-templates" element={<ScheduleTemplates />} />
        <Route path="/executive-reports" element={<ExecutiveReports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/support" element={<Support />} />
        <Route path="/submit-ticket" element={<SubmitTicket />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support/articles/:id" element={<ArticleDetail />} />
        <Route path="/support/articles" element={<AllPosts />} />
        <Route path="/nurse-view" element={<NurseView />} />
        <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Layout>
  );
}

export default App;
