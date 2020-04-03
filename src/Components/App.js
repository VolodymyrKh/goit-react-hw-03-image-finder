import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar/SearchBar';
import Error from './Error/Error.js';
import * as ImageAPI from './Services/Api';
import Loader from 'react-loader-spinner';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  static defaultProps = {
    images: [],
    isLoading: false,
    isOpenModal: false,
    currentLargeImageURL: '',
    error: null,
    query: '',
    pageNr: 1,
  };

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    currentLargeImageURL: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    pageNr: PropTypes.number.isRequired,
  };

  state = {
    images: this.props.images,
    isLoading: this.props.isLoading,
    isOpenModal: this.props.isLoading,
    currentLargeImageURL: this.props.currentLargeImageURL,
    error: this.props.error,
    query: this.props.query,
    pageNr: this.props.pageNr,
  };

  handleChangeQuery = query => {
    this.setState({
      query,
      pageNr: 1,
    });
  };

  handleChangePageNr = () => {
    this.setState(state => ({
      pageNr: this.state.pageNr + 1,
    }));
  };

  openModal = largeImageURL => {
    this.setState({ isOpenModal: true, currentLargeImageURL: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });
      ImageAPI.fetchImages(this.state.query, this.state.pageNr)
        .then(({ data }) => {
          this.setState({ images: data.hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    } else if (prevState.pageNr !== this.state.pageNr) {
      this.setState({ isLoading: true });
      ImageAPI.fetchImages(this.state.query, this.state.pageNr)
        .then(({ data }) => {
          this.setState(state => ({ images: [...state.images, ...data.hits] }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const {
      images,
      isLoading,
      error,
      isOpenModal,
      currentLargeImageURL,
    } = this.state;

    return (
      <>
        <SearchBar onChangeQuery={this.handleChangeQuery} />
        {error && <Error text={error.message} />}

        {isLoading && (
          <div className={styles.Center}>
            <Loader type="Bars" color="#1E90FF" height={150} width={150} />
          </div>
        )}

        {images.length > 0 && (
          <>
            <ImageGallery images={images} onOpenModal={this.openModal} />
            <Button onChangePageNr={this.handleChangePageNr} />
          </>
        )}

        {isOpenModal && (
          <Modal image={currentLargeImageURL} onCloseModal={this.closeModal} />
        )}
      </>
    );
  }
}
