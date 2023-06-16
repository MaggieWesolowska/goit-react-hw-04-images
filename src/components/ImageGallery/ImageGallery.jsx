import propTypes from 'prop-types';
import { GalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.gallery}>
    {images.map((image, index) => (
      <GalleryItem
        key={index}
        image={image}
        onClick={onImageClick}
      ></GalleryItem>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  onImageClick: propTypes.func.isRequired,
};
