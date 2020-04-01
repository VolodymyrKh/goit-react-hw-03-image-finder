import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Error from './Error/Error.js';
import * as ImageAPI from './Services/Api';
import Loader from 'react-loader-spinner';
import Button from './Button/Button';
import styles from './App.module.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    pageNr: 1,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });
      ImageAPI.fetchImages(this.state.query, this.state.pageNr)
        .then(({ data }) => {
          this.setState({ images: data.hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }

    if (prevState.pageNr !== this.state.pageNr && this.state.pageNr !== 1) {
      this.setState({ isLoading: true });
      ImageAPI.fetchImages(this.state.query, this.state.pageNr)
        .then(({ data }) => {
          this.setState(state => ({ images: [...state.images, ...data.hits] }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ isLoading: false });
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <>
        <SearchBar onChangeQuery={this.handleChangeQuery} />
        {error && <Error text={error.message} />}

        {isLoading && (
          <div className={styles.Center}>
            <Loader type="Bars" color="#1E90FF" height={150} width={150} />
          </div>
        )}

        {images.length > 0 && !isLoading && (
          <>
            <ImageGallery images={images} />
            <Button onChangePageNr={this.handleChangePageNr} />
          </>
        )}
      </>
    );
  }
}
