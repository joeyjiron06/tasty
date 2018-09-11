import React from 'react';
import EditRecipeCard from './editRecipeCard';
import { render, fireEvent } from 'react-testing-library';

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

  it('should call the onCancel callback when cancel button is clicked', () => {
    const onCancel = jest.fn();
    const { getByText } = render(
      <EditRecipeCard recipe={recipe} onCancel={onCancel} />
    );

    getByText(/cancel/i).click();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call the onDelete callback when delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <EditRecipeCard recipe={recipe} onDelete={onDelete} />
    );

    getByText(/delete/i).click();
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(recipe);
  });

  it('should call the onSave callback with the new recipe when save button is clicked', () => {
    const onSave = jest.fn();
    const { getByText, getAllByPlaceholderText, getByPlaceholderText } = render(
      <EditRecipeCard recipe={recipe} onSave={onSave} />
    );

    // add new empty items to the list
    getByText(/add tag/i).click();
    getByText(/add ingredient/i).click();
    getByText(/add direction/i).click();

    // change the input fields
    fireEvent.change(getByPlaceholderText(/name of recipe/i), {
      target: { value: 'Test Title' }
    });
    fireEvent.change(getByPlaceholderText(/How many does it serve\?/i), {
      target: { value: '42' }
    });
    fireEvent.change(getByPlaceholderText(/How long does it take\?/i), {
      target: { value: '66' }
    });
    fireEvent.change(getByPlaceholderText(/Image url/i), {
      target: { value: 'http://new.image.com' }
    });
    fireEvent.change(getAllByPlaceholderText(/tag name/i)[recipe.tags.length], {
      target: { value: 'New Tag' }
    });
    fireEvent.change(
      getAllByPlaceholderText(/ingredient/i)[recipe.ingredients.length],
      {
        target: { value: 'New Ingredient' }
      }
    );
    fireEvent.change(
      getAllByPlaceholderText(/direction/i)[recipe.directions.length],
      {
        target: { value: 'New Direction' }
      }
    );

    getByText(/save/i).click();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      title: 'Test Title',
      serves: 42,
      duration: 66,
      image: 'http://new.image.com',
      tags: expect.arrayContaining([...recipe.tags, 'New Tag']),
      ingredients: expect.arrayContaining([
        ...recipe.ingredients,
        'New Ingredient'
      ]),
      directions: expect.arrayContaining([
        ...recipe.directions,
        'New Direction'
      ])
    });
  });

  // new recipe

  // TODO move this to a separate component
  // describe('tag', () => {
  //   it('should add a tag to the list when "Add Tag" button is clicked');
  //   it('should remove a tag when the "X" button is clicked');
  // });
});
