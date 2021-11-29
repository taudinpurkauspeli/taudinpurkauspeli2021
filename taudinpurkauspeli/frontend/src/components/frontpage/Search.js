/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Search = ({ newSearch, searchCases }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="search">
        {t('searchByTitle')}
        &nbsp;
        <input
          id="search"
          value={newSearch}
          onChange={searchCases}
        />
      </label>
    </div>
  );
};

export default Search;
