import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import Example from '.'

export default {
  title: 'Example',
  component: Example,
};

export const FirstExample = () => (
  <Example />
);