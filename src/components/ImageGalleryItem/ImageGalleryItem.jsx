import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const GalleryItem = ({ image, onClick }) => (
  <li className={css.imageItem} id={image.id} onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.image}
    />
  </li>
);

GalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};
