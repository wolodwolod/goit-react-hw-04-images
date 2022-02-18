import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

 const Loader = () => {
  return (
    <div className={s.Loader} >
      <TailSpin />
    </div>
  );
};
export default Loader;