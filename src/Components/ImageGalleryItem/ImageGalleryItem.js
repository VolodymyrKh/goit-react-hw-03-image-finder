import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, onOpenModal }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt="img"
      onClick={onOpenModal}
      className={styles.ImageGalleryItemImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
