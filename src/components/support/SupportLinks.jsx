import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaBook, FaLifeRing } from 'react-icons/fa';

const SupportLinks = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <a href="#faqs" className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-center h-12 rounded-md">
              <FaQuestionCircle className="h-6 w-6 text-customBlue" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">FAQs</h3>
              <p className="mt-1 text-sm text-gray-500">FAQ, short for frequently asked questions, is a list of commonly asked questions and answers about a specific topic.</p>
            </div>
          </a>
          <Link to="/support/articles" className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-center h-12 rounded-md">
              <FaBook className="h-6 w-6 text-customBlue" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Guides & Resources</h3>
              <p className="mt-1 text-sm text-gray-500">UI Style Guides are a design & development tool that brings cohesion to a digital product user interface & experience.</p>
            </div>
          </Link>
          <Link to="/submit-ticket" className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center justify-center h-12 rounded-md">
              <FaLifeRing className="h-6 w-6 text-customBlue" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Support</h3>
              <p className="mt-1 text-sm text-gray-500">The good news is that you are not alone, and you are in the right place. Contact us for more detailed support.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportLinks;
