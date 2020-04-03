import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onOpenModal }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, largeImageURL, ...image }) => (
      <ImageGalleryItem
        key={id}
        {...image}
        onOpenModal={() => onOpenModal(largeImageURL)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
export default ImageGallery;
