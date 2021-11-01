/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import HowToPlay from '../components/HowToPlay';

test('Game instructions header is rendered', () => {
  expect(component.container).toHaveTextContent(
    'howToPlay',
  );

  expect(component.container).toHaveTextContent(
    'Peliohjeet',
  );
});
