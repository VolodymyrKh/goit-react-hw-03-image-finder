import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onChangePageNr }) => (
  <button type="button" onClick={onChangePageNr} className={styles.Button}>
    Load more
  </button>
);

Button.propTypes = {
  onChangePageNr: PropTypes.func.isRequired,
};
export default Button;
