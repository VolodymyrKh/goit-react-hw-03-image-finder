import React from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, ...image }) => (
      <ImageGalleryItem key={id} {...image} />
    ))}
  </ul>
);

export default ImageGallery;
