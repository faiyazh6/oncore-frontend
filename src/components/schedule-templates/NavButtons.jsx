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

const buttonStyles = {
  backgroundColor: '#EEF1F6',
  borderRadius: '0.375rem',
  boxShadow: 'var(--chakra-shadows-sm)',
  color: '#1a202c',
  transition: 'background-color 0.2s ease',
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
    <div className="flex flex-wrap gap-4 relative z-20">
      <div>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            sx={buttonStyles}
            _hover={buttonHoverStyles}
            _active={buttonActiveStyles}
          >
            {selectedLocation}
          </MenuButton>
          <MenuList className="relative z-50">
            <MenuItem onClick={() => handleLocationSelect('Penn Center')}>Penn Center</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Drexel Center')}>Drexel Center</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Temple Center')}>Temple Center</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div>
        <InputGroup>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            customInput={
              <Button
                rightIcon={<CalendarIcon />}
                sx={buttonStyles}
                _hover={buttonHoverStyles}
                _active={buttonActiveStyles}
              >
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
              </Button>
            }
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default NavButtons;
