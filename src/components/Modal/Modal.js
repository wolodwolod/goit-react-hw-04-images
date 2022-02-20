import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const secondRoot = document.querySelector('#second-root');

function Modal ({onClose, children }) {
  
  // Слушатель событий на нажатие клавиш
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Если у слушателя клавиша - Escape, закрываем модалку.
const handleKeyDown = e => {
    if (e.code === 'Escape') {
    onClose();
    }
  };

  // Если клик на Backdrop, закрываем модалку

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  
      return createPortal(
        
          <div className={s.Overlay} onClick={handleBackdropClick}>
  <div className={s.Modal}>{children}</div>,
          </div>,
          secondRoot
   );
}
  
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Modal;