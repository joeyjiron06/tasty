import PropTypes from 'prop-types';

export const RecipeType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  serves: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  directions: PropTypes.arrayOf(PropTypes.string).isRequired
});
