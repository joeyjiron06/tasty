import React from 'react';
// import { mount } from 'enzyme';
import { unwrap, createMount } from '@material-ui/core/test-utils';
import BrowsePage from './browse';
import RecipeCard from '../components/recipeCard.js';
import { fetchRecipes } from '../api/recipes.js';

jest.mock('../api/recipes.js');

describe('<BrowsePage />', () => {
  it('should have a title', () => {
    const browsePage = renderBrowsePage();
    expect(browsePage.getTitle()).toBe('Browse Recipes');
  });

  it('should render the fetched recipes', async () => {
    const promise = Promise.resolve([
      {
        id: 0,
        title: 'Soba Noodles',
        image: 'http://image.com',
        tags: ['Dinner', 'Noodles']
      },
      {
        id: 1,
        title: 'Miso Soup',
        image: 'http://image.com',
        tags: ['Dinner', 'Soup']
      },
      {
        id: 2,
        title: 'Gyoza',
        image: 'http://image.com',
        tags: ['Dinner', 'Dumplings']
      }
    ]);
    fetchRecipes.mockImplementation(() => promise);
    const browsePage = renderBrowsePage();
    const recipes = await promise;

    browsePage.update();

    const recipeCards = browsePage.findCards();

    expect(recipeCards).toHaveLength(recipes.length);

    recipes.forEach((recipe, index) => {
      const recipeProp = recipeCards.at(index).props().recipe;
      expect(recipeProp).toEqual(recipe);
    });
  });

  it('should render no results when recipe list is empty', async () => {
    const promise = Promise.resolve([]);
    fetchRecipes.mockImplementation(() => promise);
    const browsePage = renderBrowsePage();
    const recipes = await promise;

    browsePage.update();
    const noResultsContainer = browsePage.getNoResultsContainer();

    expect(noResultsContainer).toExist();
    expect(noResultsContainer.text()).toBe('No Results');
  });

  it('should render an error when error fetching recipes', async () => {
    const promise = Promise.reject(new Error('error fetching recipes'));
    fetchRecipes.mockImplementation(() => promise);
    const browsePage = renderBrowsePage();

    try {
      // will no resolve
      await promise;
    } catch (e) {
      browsePage.update();

      const errorContainer = browsePage.getErrorContainer();

      expect(errorContainer).toExist();
      expect(errorContainer.text()).toBe('Error fetching recipes');
    }
  });
});

const renderBrowsePage = props => {
  const mount = createMount();
  const wrapper = mount(<BrowsePage {...props} />);

  wrapper.getTitle = () =>
    wrapper
      .find('[data-test="browsepage-title"]')
      .last()
      .props().children;

  wrapper.findCards = () => wrapper.find(RecipeCard).children();

  wrapper.getNoResultsContainer = () =>
    wrapper.find('[data-test="browsepage-no-results"] p');

  wrapper.getErrorContainer = () =>
    wrapper.find('[data-test="browsepage-error"] p');

  return wrapper;
};
