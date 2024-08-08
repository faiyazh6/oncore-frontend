import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Welcome() {

  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div>
      <div className="lg:pl-64">
        <div className="my-5 flex h-auto sm:h-16 flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-4 sm:px-6 lg:px-8 print-hidden">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue mb-4 sm:mb-0">Hello {firstName},</h1>
        </div>

        <main className="py-10">
        
        </main>
      </div>
    </div>
  );
}

export default Welcome;