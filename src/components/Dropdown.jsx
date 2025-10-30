import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: 'Sort By', value: '' },
    { label: 'Release Date (Asc)', value: 'release_asc' },
    { label: 'Release Date (Desc)', value: 'release_desc' },
    { label: 'Rating (Asc)', value: 'rating_asc' },
    { label: 'Rating (Desc)', value: 'rating_desc' },
  ];

  // exit via clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (option) => {
    onSortChange(option.value);
    setIsOpen(false);   // close the menu when an item is selected
  };

  const selectedOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0];

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        id="dropdown-button" 
        onClick={() => setIsOpen(prev => !prev)}    // toggle state
      >
        {selectedOption.label} ▼
      </button>
      
      {isOpen && (  // conditional rendering
        <div id="dropdown-menu" className="dropdown-menu">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${option.value === currentSort ? 'selected' : ''}`}
              data-sort={option.value}
              onClick={() => handleItemClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;