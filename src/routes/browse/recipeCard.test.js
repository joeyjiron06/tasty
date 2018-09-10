import React from 'react';
import RecipeCard from './recipeCard';
import { render, fireEvent } from 'react-testing-library';

describe('<RecipeCard />', () => {
  const recipe = {
    image: 'http://image.com',
    title: 'Soba Noodles',
    tags: ['Dinner', 'Noodle', 'Japanese']
  };

  describe('render recipe', () => {
    it('should render the image', () => {
      const { getByTestId } = render(<RecipeCard recipe={recipe} />);
      expect(getByTestId('recipecard-image')).toHaveStyle(
        `background-image: url(${recipe.image});`
      );
    });

    it('should render the title', () => {
      const { getByTestId } = render(<RecipeCard recipe={recipe} />);
      expect(getByTestId('recipecard-title')).toHaveTextContent(recipe.title);
    });

    it('should render the tags', () => {
      const { getByTestId } = render(<RecipeCard recipe={recipe} />);
      expect(getByTestId('recipecard-tags')).toHaveTextContent(
        recipe.tags.join(' · ')
      );
    });
  });

  describe('className props', () => {
    it('should not add className if none are given', () => {
      const { getByTestId } = render(
        <RecipeCard recipe={recipe} className={undefined} />
      );

      expect(getByTestId('recipecard')).not.toHaveClass('undefined');
    });

    it('should add className to card', () => {
      const { getByTestId } = render(
        <RecipeCard recipe={recipe} className="bestClassEver" />
      );

      expect(getByTestId('recipecard')).toHaveClass('bestClassEver');
    });
  });

  describe('onClick', () => {
    it('should invoke the onClick function when a card is clicked', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <RecipeCard recipe={recipe} onClick={onClick} />
      );

      fireEvent(
        getByTestId('recipecard'),
        new MouseEvent('click', {
          bubbles: true, // click events must bubble for React to see it
          cancelable: true
        })
      );
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
