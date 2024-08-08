import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon, CalendarIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './NavButtons.module.css';

const buttonStyles = {
  backgroundColor: '#EEF1F6',
  borderRadius: '0.375rem',
  boxShadow: 'var(--chakra-shadows-sm)',
  color: '#1a202c',
  transition: 'background-color 0.2s ease',
  fontFamily: 'Manrope, sans-serif',
};

const buttonHoverStyles = {
  backgroundColor: '#e2e8f0',
};

const buttonActiveStyles = {
  backgroundColor: '#cbd5e0',
};

const NavButtons = ({ className }) => {
  const [selectedLocation, setSelectedLocation] = useState('Penn Center');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleLocationSelect = (option) => {
    setSelectedLocation(option);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            sx={buttonStyles}
            _hover={buttonHoverStyles}
            _active={buttonActiveStyles}
            className="font-manrope"
          >
            {selectedLocation}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLocationSelect('Penn Center')}>Penn Center</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Drexel Center')}>Drexel Center</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Temple Center')}>Temple Center</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={
            <button
              id="datepickerButton"
              className="text-black bg-[#EEF1F6] hover:bg-[#e2e8f0] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center font-manrope"
              style={{
                backgroundColor: '#EEF1F6',
                borderRadius: '0.375rem',
                boxShadow: 'var(--chakra-shadows-sm)',
                color: '#1a202c',
                transition: 'background-color 0.2s ease',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
              <CalendarIcon className="w-4 h-4 ml-2" />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default NavButtons;