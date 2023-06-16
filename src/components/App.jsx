import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api/fetchImages';
import React from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setQuery] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading({ isLoading: true });
    const searchInput = e.target.elements.searchInput;
    if (searchInput.value.trim() === '') {
      return;
    }
    try {
      const response = await fetchImages(searchInput.value, 1);
      setImages(response);
      setQuery(searchInput.value);
      setPageNr(2);
    } catch (error) {
      setError(error);
    } finally {
      setLoading({ isLoading: false });
    }
  };

  const handleMoreButton = async () => {
    setLoading({ isLoading: true });
    const response = await fetchImages(searchQuery, pageNr);
    setImages([...images, ...response]);
    setLoading(false);
    setPageNr(pageNr + 1);
  };

  const handleImageClick = e => {
    setModalOpen({ isModalOpen: true });
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen({ isModalOpen: false });
    setModalImg('');
    setModalAlt('');
  };

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.code === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', this.handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', this.handleEscapeKey);
    };
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {images.length >= 12 ? <Button onClick={handleMoreButton} /> : null}
          {error && (
            <p
              style={{
                marginLeft: 30,
                fontWeight: 'bold',
                color: '#00415a',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              {' '}
              ...Whoops, something went wrong, try again
            </p>
          )}
        </div>
      )}
      {isModalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      ) : null}
    </div>
  );
};
