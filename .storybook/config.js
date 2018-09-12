import { configure } from '@storybook/react';
import { describe, it } from 'storybook-addon-specifications';

window.describe = describe;
window.it = it;

function loadStories() {
  require('../src/routes/admin/editRecipeCard.stories');
}

configure(loadStories, module);
