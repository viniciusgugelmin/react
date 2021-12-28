import './styles.css';

export const SearchInput = ({ searchValue, handleChange }) => (
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
