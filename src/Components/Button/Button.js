import React from 'react';
import styles from './Button.module.css';

const Button = ({ onfetchGalleryClick }) => (
  <button type="button" onClick={onfetchGalleryClick} className={styles.Button}>
    Load more
  </button>
);

export default Button;
