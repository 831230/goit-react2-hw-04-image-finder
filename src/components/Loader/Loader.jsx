import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ visually}) => {
  if (visually) {
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    );
  }

};

Loader.propTypes = {
  visually: PropTypes.bool,
};

export default Loader;
