import React from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onOpenModal }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, largeImageURL, ...image }) => (
      <ImageGalleryItem key={id} {...image} onOpenModal ={()=> onOpenModal(largeImageURL)}/>
    ))}
  </ul>
);

export default ImageGallery;
