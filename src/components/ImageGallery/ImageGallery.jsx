import React from 'react';
import PropTypes from 'prop-types';

import imageGalleryStyles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={imageGalleryStyles.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
