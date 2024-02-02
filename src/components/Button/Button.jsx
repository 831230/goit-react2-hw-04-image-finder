import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from './Button.module.css';

const Button = ({ loadMore, page, perPage, totalHits }) => {
  const loadMoreBtn =
    totalHits + perPage - page * perPage > perPage ? (
      <button onClick={loadMore} className={buttonStyles.Button}>
        Load more
      </button>
    ) : null;
  return <>{loadMoreBtn}</>;
};

Button.propTypes = {
  items: PropTypes.array,
  loadMore: PropTypes.func,
  totalHits: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
};

export default Button;
