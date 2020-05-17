import React from 'react';
import { action } from '@storybook/addon-actions';
import CardList from '.'

export default {
  title: 'CardList',
  component: CardList,
};

export const CardList1 = () => (
  <CardList>
    hello
  </CardList>
);