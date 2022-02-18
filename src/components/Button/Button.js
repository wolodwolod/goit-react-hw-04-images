import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ children, onClick }) => (
  <button className={s.Button} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default Button;