import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditRecipeCard from '../src/routes/admin/editRecipeCard';

storiesOf('EditRecipeCard', module).add('Simple', () => (
  <EditRecipeCard
    recipe={{
      title: 'Soba Noodles',
      image:
        'https://lh3.googleusercontent.com/xrFXc6bIfRjP21UG4I13VJ-FnnrJsidtZGYAqNLr3HTY7qehx24HuOSZsIxnNh2spMdz_qmZ6qPJxTbmwQik0Thm1s46TJMZ00eaTeyY3WUty5DSQsg4VR2AyF35iSk0edNVK_g0WA=w512',
      serves: 2,
      duration: 60,
      tags: ['Dinner', 'Noodle', 'Japanese'],
      ingredients: ['1 lime', '1 cup of noodles'],
      directions: ['boil noodles', 'serve hot']
    }}
  />
));
