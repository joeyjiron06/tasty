import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditRecipeCard from '../src/routes/admin/editRecipeCard';

storiesOf('EditRecipeCard', module).add('Simple', () => (
  <EditRecipeCard
    recipe={{
      title: 'Soba Noodles',
      image: 'http://image.com',
      serves: 2,
      duration: 60,
      tags: ['Dinner', 'Noodle', 'Japanese'],
      ingredients: ['1 lime', '1 cup of noodles'],
      directions: ['boil noodles', 'serve hot']
    }}
  />
));
