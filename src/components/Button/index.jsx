import P from 'prop-types';
import './styles.css';

export const Button = ({ text, fn, disabled = false }) => (
  <button onClick={fn} className="button" disabled={disabled}>
    {text}
  </button>
);

Button.propTypes = {
  text: P.string.isRequired,
  fn: P.func.isRequired,
  disabled: P.bool,
};
