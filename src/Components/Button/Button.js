import React from 'react';
import styles from './Button.module.css';

const Button = ({ onChangePageNr }) => (
  <button type="button" onClick={onChangePageNr} className={styles.Button}>
    Load more
  </button>
);

export default Button;
