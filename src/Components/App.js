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

  fetchGallerySubmit = query => {
    this.setState({ isLoading: true, query, pageNr: 1 });
    ImageAPI.fetchImages(query)
      .then(({ data }) => {
        this.setState({ images: data.hits });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  fetchGalleryClick = () => {
    const page = this.state.pageNr + 1;
    this.setState(state => ({
      isLoading: true,
      pageNr: page,
    }));
    ImageAPI.fetchImages(this.state.query, page)
      .then(({ data }) => {
        this.setState(state => ({ images: [...state.images, ...data.hits] }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
      
  };

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.fetchGallerySubmit} />
        {error && <Error text={error.message} />}
        {isLoading && (
          <div className={styles.Center}>
            <Loader type="Bars" color="#1E90FF" height={150} width={150} />
          </div>
        )}
        {images.length > 0 && (
          <>
            {' '}
            <ImageGallery images={images} />
            <Button onfetchGalleryClick={this.fetchGalleryClick} />{' '}
          </>
        )}
      </>
    );
  }
}
