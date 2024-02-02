import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import imageGalleryItemStyles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, showImg }) => {
  const imagesList = images.map(image => (
    <li key={nanoid()} className={imageGalleryItemStyles.ImageGalleryItem}>
      <img
        src={image.webImg}
        alt={image.tag}
        className={imageGalleryItemStyles.ImageGalleryItemImage}
        onClick={() => showImg(image.largeImg)}
      />
    </li>
  ));

  return <>{imagesList}</>;
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  showImg: PropTypes.func,
};

export default ImageGalleryItem;
