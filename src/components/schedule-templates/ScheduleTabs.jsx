import React, { useState } from 'react';
import MondayTable from './Tables/MondayTable';
import TuesdayTable from './Tables/TuesdayTable';
import WednesdayTable from './Tables/WednesdayTable';
import ThursdayTable from './Tables/ThursdayTable';
import FridayTable from './Tables/FridayTable';

const tabs = [
  { name: 'Monday', index: 0 },
  { name: 'Tuesday', index: 1 },
  { name: 'Wednesday', index: 2 },
  { name: 'Thursday', index: 3 },
  { name: 'Friday', index: 4 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ScheduleTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderTabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <MondayTable />;
      case 1:
        return <TuesdayTable />;
      case 2:
        return <WednesdayTable />;
      case 3:
        return <ThursdayTable />;
      case 4:
        return <FridayTable />;
      default:
        return <MondayTable />;
    }
  };

  return (
    <div className="tabsContainer">
      <div className="sm:hidden print:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={tabs[selectedIndex].name}
          onChange={(e) => setSelectedIndex(tabs.find(tab => tab.name === e.target.value).index)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block print:hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setSelectedIndex(tab.index)}
                className={classNames(
                  selectedIndex === tab.index
                    ? 'border-[#081B60] text-[#081B60]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-base font-medium'
                )}
                aria-current={selectedIndex === tab.index ? 'page' : undefined}
              >
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="tabContent mt-4 print:block">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ScheduleTabs;