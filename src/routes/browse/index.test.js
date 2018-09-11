import React from 'react';
import BrowsePage from './index';
import { fetchRecipes } from '../../api/recipes';
import { render, waitForElement } from 'react-testing-library';

jest.mock('../../api/recipes.js');

describe('<BrowsePage />', () => {
  it('should have a title', () => {
    const { getByTestId } = render(<BrowsePage />);

    expect(getByTestId('browsepage-title')).toHaveTextContent('Browse Recipes');
  });

  it('should render the fetched recipes', async () => {
    const recipes = [
      {
        id: 0,
        title: 'Soba Noodles',
        image: 'http://image.com',
        tags: ['Dinner', 'Noodles'],
        ingredients: [],
        directions: [],
        serves: 1,
        duration: 20
      },
      {
        id: 1,
        title: 'Miso Soup',
        image: 'http://image.com',
        tags: ['Dinner', 'Soup'],
        ingredients: [],
        directions: [],
        serves: 1,
        duration: 20
      },
      {
        id: 2,
        title: 'Gyoza',
        image: 'http://image.com',
        tags: ['Dinner', 'Dumplings'],
        ingredients: [],
        directions: [],
        serves: 1,
        duration: 20
      }
    ];
    fetchRecipes.mockImplementation(() => Promise.resolve(recipes));

    const { getAllByTestId } = render(<BrowsePage />);
    const recipeCards = await waitForElement(() =>
      getAllByTestId('recipecard')
    );

    expect(recipeCards).toHaveLength(recipes.length);
  });

  it('should render no results when recipe list is empty', async () => {
    fetchRecipes.mockImplementation(() => Promise.resolve([]));

    const { getByText } = render(<BrowsePage />);
    const noResultsEl = await waitForElement(() => getByText('No Results'));

    expect(noResultsEl).toBeInTheDocument();
  });

  it('should render an error when error fetching recipes', async () => {
    fetchRecipes.mockImplementation(() =>
      Promise.reject(new Error('test error'))
    );

    const { getByText } = render(<BrowsePage />);
    const errorEl = await waitForElement(() =>
      getByText('Error fetching recipes')
    );

    expect(errorEl).toBeInTheDocument();
  });

  it('should render a loading circle when loading', async () => {
    fetchRecipes.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 750))
    );

    const { getByTestId } = render(<BrowsePage />);

    expect(getByTestId('browsepage-loading-indicator')).toBeInTheDocument();
  });
});
