import React from 'react';
import { shallow } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import RecipeCard from './recipeCard';

const shallowRender = props => {
  const RecipeCardUnwrapped = unwrap(RecipeCard);
  const wrapper = shallow(<RecipeCardUnwrapped {...props} />);

  wrapper.getImageUrl = () =>
    wrapper.find('[data-test="recipecard-image"]').props().image;

  wrapper.getTitle = () =>
    wrapper.find('[data-test="recipecard-title"]').props().children;

  wrapper.getTags = () =>
    wrapper.find('[data-test="recipecard-tags"]').props().children;

  wrapper.findCard = () => wrapper.find('[data-test="recipecard-card"]');

  wrapper.click = () => wrapper.findCard().simulate('click');

  return wrapper;
};

describe('<RecipeCard />', () => {
  const recipe = {
    image: 'http://image.com',
    title: 'Soba Noodles',
    tags: ['Dinner', 'Noodle', 'Japanese']
  };

  describe('render recipe', () => {
    it('should render the image', () => {
      const recipeCard = shallowRender({ recipe });
      expect(recipeCard.getImageUrl()).toBe(recipe.image);
    });

    it('should render the title', () => {
      const recipeCard = shallowRender({ recipe });
      expect(recipeCard.getTitle()).toBe(recipe.title);
    });

    it('should render the tags', () => {
      const recipeCard = shallowRender({ recipe });
      expect(recipeCard.getTags()).toBe(recipe.tags.join(' · '));
    });
  });

  describe('className props', () => {
    it('should not add className if none are given', () => {
      const recipeCard = shallowRender({ recipe });
      expect(recipeCard.findCard()).toHaveProp({
        className: ''
      });
    });

    it('should add className to card', () => {
      const recipeCard = shallowRender({ recipe, className: 'testme' });
      expect(recipeCard.findCard()).toHaveClassName('testme');
    });
  });

  describe('onClick', () => {
    it('shuold pass the onClick function to the card', () => {
      const onClick = jest.fn();
      const recipeCard = shallowRender({ recipe, onClick });
      expect(recipeCard.findCard()).toHaveProp({
        onClick
      });
    });
    it('should invoke the onClick function when a card is clicked', () => {
      const onClick = jest.fn();
      const recipeCard = shallowRender({ recipe, onClick });

      recipeCard.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
