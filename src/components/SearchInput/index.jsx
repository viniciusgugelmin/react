import './styles.css';
import P from 'prop-types';

export const SearchInput = ({ searchValue = '', handleChange }) => (
  <label>
    <input
      className="search-input"
      onChange={handleChange}
      placeholder="Type to search..."
      value={searchValue}
      type="search"
    />
  </label>
);

SearchInput.propTypes = {
  searchValue: P.string,
  handleChange: P.func.isRequired,
};
