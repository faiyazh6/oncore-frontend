import React, { useRef, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { connectSearchBox } from 'react-instantsearch-dom';

const CustomSearchBox = ({ currentRefinement, refine }) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search Dashboard"
        className="w-full py-3.5 pl-10 pr-20 rounded-md text-xs border-none focus:outline-none"
        value={currentRefinement}
        onChange={(event) => {
          const value = event.currentTarget.value;
          refine(value);
        }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
        <span className="px-1 py-0.5 text-xs font-medium text-customBlue bg-gray-100 rounded">⌘</span>
        <span className="px-1.5 py-0.5 text-xs font-medium text-customBlue bg-gray-100 rounded">K</span>
      </div>
    </div>
  );
};

export default connectSearchBox(CustomSearchBox);
