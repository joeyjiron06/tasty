import React from 'react';
import { mount } from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import BrowsePage from './browse';

describe('<BrowsePage />', () => {
  it('should have a title', () => {
    const browsePage = mountRender();
    expect(browsePage.getTitle()).toBe('Browse Recipes');
  });
  it('should render the fetched recipes');
});

const mountRender = props => {
  const BrowsePageUnwrapped = unwrap(BrowsePage);
  const wrapper = mount(<BrowsePageUnwrapped {...props} />);

  // wrapper.getImageUrl = () =>
  //   wrapper.find('[data-test="recipecard-image"]').props().image;

  // wrapper.getTitle = () =>
  //   wrapper.find('[data-test="recipecard-title"]').props().children;

  // wrapper.getTags = () =>
  //   wrapper.find('[data-test="recipecard-tags"]').props().children;

  // wrapper.findCard = () => wrapper.find('[data-test="recipecard-card"]');

  // wrapper.click = () => wrapper.findCard().simulate('click');

  return wrapper;
};
