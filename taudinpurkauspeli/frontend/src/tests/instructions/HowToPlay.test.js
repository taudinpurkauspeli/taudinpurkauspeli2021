/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import HowToPlay from '../../components/instructions/HowToPlay';

let component;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  component = render(
    <HowToPlay />,
  );
});

test('renders instructions', () => {
  expect(component.container).toHaveTextContent(
    'howToPlay',
  );
});
