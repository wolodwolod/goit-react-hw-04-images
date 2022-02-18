import { createPortal } from 'react-dom';
import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const secondRoot = document.querySelector('#second-root');

 const Loader = () => {
  return createPortal(
    <div className={s.Loader} >
      <TailSpin />
      </div>,
      secondRoot
  );
};
export default Loader;