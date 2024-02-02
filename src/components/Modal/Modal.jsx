import React from 'react';
import PropTypes from 'prop-types';

import modalStyles from './Modal.module.css';

const Modal = ({ image, hiddenModal }) => {
  const largeImage = image ? (
    <div className={modalStyles.Overlay} onClick={hiddenModal}>
      <div className={modalStyles.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  ) : null;
  return <>{largeImage}</>;
};

Modal.propTypes = {
  image: PropTypes.string,
  hiddenModal: PropTypes.func,
};

export default Modal;
