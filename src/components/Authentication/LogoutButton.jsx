import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="rounded-md bg-acuityHigh px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;