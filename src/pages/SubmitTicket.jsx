import React from 'react';
import TicketForm from '../components/support/TicketForm';

const SubmitTicket = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:pl-64">
      <div className="max-w-2xl w-full">
        <TicketForm />
      </div>
    </div>
  );
};

export default SubmitTicket;