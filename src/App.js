import React from 'react';
import { useState } from 'react';

// external functions import
import { fetchPixabayApi } from './fetchPictures/fetchPictures';

// components import
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

// styles import
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const onSubmit = evt => {
    evt.preventDefault();
    setPage(1);
    const inputValue = evt.target.searchText.value;
    if (inputValue === '') {
      return alert('writte query please');
    }
    setQuery(query => (query = inputValue));
    setLoader(true);

    fetchPixabayApi(inputValue)
      .then(response => {
        if (response.data.total === 0) {
          return alert('No pictures found');
        }
        const newImages = response.data.hits.map(image => {
          return {
            id: image.id,
            webImg: image.webformatURL,
            largeImg: image.largeImageURL,
            tag: image.tags,
          };
        });
        setImages(images => (images = [...newImages]));
        setTotalHits(response.data.totalHits);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const showLargeImg = largeImg => {
    setLargeImage(largeImg);
  };

  const loadMore = () => {
    setPage(page + 1);

    fetchPixabayApi(query, page + 1).then(response => {
      const nextImages = response.data.hits.map(image => {
        return {
          id: image.id,
          webImg: image.webformatURL,
          largeImg: image.largeImageURL,
          tag: image.tags,
        };
      });
      setImages(images => (images = [...images, ...nextImages]));
    });
  };

  const hiddenModal = evt => {
    if (evt.target.nodeName === 'IMG') {
      return;
    } else {
      setLargeImage('');
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <Loader loader={loader} />
      <ImageGallery>
        <ImageGalleryItem images={images} showImg={showLargeImg} />
      </ImageGallery>
      <Modal image={largeImage} hiddenModal={hiddenModal} />
      <Button
        loadMore={loadMore}
        page={page}
        perPage={perPage}
        totalHits={totalHits}
      />
    </>
  );
};

export default App;
