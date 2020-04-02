import React, { Component, createRef } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  overlayRef = createRef();

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onCloseModal();
  };

  handleOverlayClick = e => {
      const {current} = this.overlayRef;
    if (current && e.target !== current) return;
    this.props.onCloseModal();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    
    return (
      <div
        ref={this.overlayRef}
        onClick={this.handleOverlayClick}
        className={styles.Overlay}
      >
        <div className={styles.Modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}
