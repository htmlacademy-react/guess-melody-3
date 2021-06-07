import PropTypes from 'prop-types';
import {GameType} from '../../const';

export default PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf([GameType.ARTIST]).isRequired,
}).isRequired;
