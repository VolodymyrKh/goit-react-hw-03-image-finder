import React from 'react';
import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={webformatURL} alt="img" className={styles.ImageGalleryItemImage} />
  </li>
);

export default ImageGalleryItem;
