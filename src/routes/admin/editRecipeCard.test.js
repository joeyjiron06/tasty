import React from 'react';
import EditRecipeCard from './editRecipeCard';
import { render } from 'react-testing-library';

describe('<EditRecipeCard />', () => {
  const recipe = {
    title: 'Soba Noodles',
    image: 'http://image.com',
    serves: 2,
    duration: 60,
    tags: ['Dinner', 'Noodle', 'Japanese'],
    ingredients: ['1 lime', '1 cup of noodles'],
    directions: ['boil noodles', 'serve hot']
  };

  it('should render the recipe received from props', () => {
    const {
      getByPlaceholderText,
      getAllByPlaceholderText,
      getByAltText,
      getByText
    } = render(<EditRecipeCard recipe={recipe} />);

    expect(getByPlaceholderText(/name of recipe/i).value).toBe(recipe.title);
    expect(getByPlaceholderText(/how many does it serve\?/i).value).toBe(
      recipe.serves + ''
    );
    expect(getByPlaceholderText(/how long does it take\?/i).value).toBe(
      recipe.duration + ''
    );
    expect(getByPlaceholderText(/image url/i).value).toBe(recipe.image);
    expect(getByAltText(/recipe preview/i)).toHaveAttribute(
      'src',
      recipe.image
    );

    expect(getByText(/add tag/i)).toBeInTheDocument();
    getAllByPlaceholderText(/tag name/i).forEach((el, index) =>
      expect(el.value).toBe(recipe.tags[index])
    );

    expect(getByText(/add ingredient/i)).toBeInTheDocument();
    getAllByPlaceholderText(/ingredient/i).forEach((el, index) =>
      expect(el.value).toBe(recipe.ingredients[index])
    );

    expect(getByText(/add direction/i)).toBeInTheDocument();
    getAllByPlaceholderText(/direction/i).forEach((el, index) =>
      expect(el.value).toBe(recipe.directions[index])
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
