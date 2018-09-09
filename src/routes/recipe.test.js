import React from 'react';
import RecipePage from './recipe';
import { fetchRecipe } from '../api/recipes';
import { render, waitForElement } from 'react-testing-library';

jest.mock('../api/recipes.js');

describe('<RecipePage />', () => {
  it('should render the recipe', async () => {
    const recipe = {
      title: 'My Recipe',
      id: 'm01923r2=6-123n1203[',
      tags: ['Dinner', 'Noodles'],
      ingredients: ['Noodles', 'Soy Sauce'],
      directions: ['Boil noodles', 'Pour Soy sauce and serve'],
      image: 'http://image.com',
      serves: 2,
      duration: 30
    };
    fetchRecipe.mockImplementation(() => Promise.resolve(recipe));

    const { getByText, getByTestId, getAllByTestId } = render(<RecipePage />);
    const titleEl = await waitForElement(() => getByText(recipe.title));
    const tagEls = getAllByTestId('recipepage-tag');
    const directionEls = getAllByTestId('recipepage-direction');
    const ingredientsEls = getAllByTestId('recipepage-ingredient');

    expect(titleEl).toBeInTheDocument();

    recipe.tags.forEach((tag, index) =>
      expect(tagEls[index]).toHaveTextContent(tag)
    );

    recipe.ingredients.forEach((ingredient, index) =>
      expect(ingredientsEls[index]).toHaveTextContent(ingredient)
    );

    recipe.directions.forEach((direction, index) =>
      expect(directionEls[index]).toHaveTextContent(direction)
    );

    expect(getByTestId('recipepage-image')).toHaveAttribute(
      'src',
      recipe.image
    );

    expect(getByTestId('recipepage-serves')).toHaveTextContent(recipe.serves);
  });

  it('should render loading indicator when page is fetching recipe', () => {
    fetchRecipe.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 750))
    );

    const { getByTestId } = render(<RecipePage />);

    expect(getByTestId('recipepage-loading-indicator')).toBeInTheDocument();
  });

  it('should render error text when an error occurs', async () => {
    fetchRecipe.mockImplementation(() =>
      Promise.reject(new Error('test error'))
    );

    const { getByText } = render(<RecipePage />);
    const errorTextEl = await waitForElement(() =>
      getByText(/Recipe does not exist/i)
    );

    expect(errorTextEl).toBeInTheDocument();
  });
});
