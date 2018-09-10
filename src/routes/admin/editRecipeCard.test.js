import React from 'react';
import EditRecipeCard from './editRecipeCard';
import { render, fireEvent } from 'react-testing-library';

describe('<EditRecipeCard />', () => {
  const recipe = {
    title: 'Soba Noodles',
    image: 'http://image.com',
    tags: ['Dinner', 'Noodle', 'Japanese'],
    ingredients: ['1 lime', '1 cup of noodles'],
    directions: ['boil noodles', 'serve hot']
  };

  it('should render the recipe received from props', () => {
    const { getByPlaceholderText } = render(<EditRecipeCard recipe={recipe} />);
    expect(getByPlaceholderText(/name of recipe/i)).toHaveTextContent(
      recipe.title
    );
  });
  it('should not render values when recipe values are empty');
  it('should call the onCancel callback when cancel button is clicked');
  it('should call the onDelete callback when delete button is clicked');
  it(
    'should call the onSave callback with the new recipe when save button is clicked'
  );

  // new recipe

  // TODO move this to a separate component
  // describe('tag', () => {
  //   it('should add a tag to the list when "Add Tag" button is clicked');
  //   it('should remove a tag when the "X" button is clicked');
  // });
});
