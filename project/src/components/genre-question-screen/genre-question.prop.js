import PropTypes from 'prop-types';
import {GameType} from '../../const';

export default PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  genre: PropTypes.string.isRequired,
  type: PropTypes.oneOf([GameType.GENRE]).isRequired,
}).isRequired;
