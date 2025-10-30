import React, { useState, useCallback } from 'react';
import Dropdown from './Dropdown';

const Header = ({ currentSort, onSortChange, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchInput = useCallback((value) => {
    const query = value.trim();
    onSearch(query);
  }, [onSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    clearTimeout(window.searchDebounceTimer);
    window.searchDebounceTimer = setTimeout(() => {
      handleSearchInput(value);
    }, 400);
  };

  return (
    <header>
      <div className="header-title">Movie Explorer</div>
      <div className="navbar-center">
        <input
          type="text"
          id="search-bar"
          placeholder="Search for a movie..."
          value={searchValue}
          onChange={handleChange}
        />
        <Dropdown currentSort={currentSort} onSortChange={onSortChange} />
      </div>
    </header>
  );
};

export default Header;