import React from 'react';
import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, onOpenModal }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={webformatURL}  alt="img" onClick={onOpenModal} className={styles.ImageGalleryItemImage} />
  </li>
);

export default ImageGalleryItem;
