import React from 'react';
import PropTypes from 'prop-types';

import searchbarStyles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={searchbarStyles.Searchbar}>
      <form className={searchbarStyles.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={searchbarStyles.SearchFormButton}>
          <span className={searchbarStyles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="searchText"
          className={searchbarStyles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
