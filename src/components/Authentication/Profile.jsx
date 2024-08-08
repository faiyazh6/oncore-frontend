import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  const userRole = user.user_metadata?.description;

  const handleClick = () => {
    navigate('/settings#personal');
  };

  return (
    <div onClick={handleClick} className="cursor-pointer flex items-center p-4 bg-white rounded-lg shadow-md max-w-xs">
      <img
        src={user.picture}
        alt={user.name}
        className="w-8 h-8 rounded-full mr-4"
      />
      <div className="overflow-hidden">
        <h2 className="text-sm font-semibold truncate">{user.name}</h2>
        {userRole && <p className="text-xs truncate">{userRole}</p>}
        <p className="text-xs truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;