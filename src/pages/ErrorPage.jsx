import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white-100 lg:pl-64">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <img src="/images/oncore.png" alt="Error" className="h-20 w-20" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Sorry, something went wrong</h1>
        <p className="mt-2 text-gray-600">The content you're looking for is unavailable. Please try again later.</p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-4 py-2 bg-[#222E93] text-white rounded-md shadow-sm hover:bg-[#1C2675] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;