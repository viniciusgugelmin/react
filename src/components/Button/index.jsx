import './styles.css';

export const Button = ({ text, fn, disabled = false }) => (
  <button onClick={fn} className="button" disabled={disabled}>
    {text}
  </button>
);
