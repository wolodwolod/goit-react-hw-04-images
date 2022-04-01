import PropTypes from 'prop-types';
import  ImageGalleryItem  from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { memo } from 'react';

export const ImageGallery = ({ images, onClick }) => {

  return (
    < ul className={s.Gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default memo(ImageGallery);