import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
      return createPortal(
        
          <div className={s.Overlay} onClick={this.handleBackdropClick}>
  <div className={s.Modal}>{this.props.children}</div>,
          </div>,
          modalRoot
          
          
    //   <Overlay onClick={this.handleBackdropClick}>
    //     <ModalStyled>{this.props.children}</ModalStyled>
    //     {/* <button type="button" onClick={this.props.onClose}>
    //       <GrClose style={{ width: 30, height: 30 }} />
    //     </button> */}
    //   </Overlay>,
      
    );
  }
}
export default Modal;