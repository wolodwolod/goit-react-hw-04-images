

import PropTypes from 'prop-types';
import s from './ImageGalIt.module.css';
import { memo } from 'react';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  console.log('rend Item')
  return (<li className={s.GalleryIitem} onClick={() => {
onClick(largeImageURL);
    }}>
  <img className={s.GalleryItem__Img} src={webformatURL} alt={tags} />
</li>  
    
  );}
    
  

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(ImageGalleryItem);