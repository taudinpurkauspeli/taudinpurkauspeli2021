import React from 'react';

const SearchField = ({ newSearch, onChange, placeholder }) => (
  <div>
    <input
      id="search"
      value={newSearch}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default SearchField;
