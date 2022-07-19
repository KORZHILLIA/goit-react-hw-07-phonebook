import { memo } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChange }) => {
  const inputChangeHandler = ({ target }) => {
    onChange(target.value);
  };

  return (
    <>
      <h3>Find contacts by name</h3>
      <input type="text" onChange={inputChangeHandler} />
    </>
  );
};

Filter.defaultProps = {
  onChange: () => {},
};

Filter.propTypes = {
  onChange: PropTypes.func,
};

export default memo(Filter);
