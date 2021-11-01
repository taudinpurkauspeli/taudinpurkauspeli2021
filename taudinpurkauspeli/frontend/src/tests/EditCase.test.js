/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import HideCase from '../components/case/HideCase';

const cases = [{
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/hidecase/id' }),
}));

// Checking if hidden checkbox works as intended
test('<HideCase /> updates parent state and calls onSubmit', () => {
  const hideCase = jest.fn();

  const component = render(
    <HideCase cases={cases} hideCaseFunc={hideCase} />,
  );

  const hidden = component.container.querySelector('#hidden');
  const form = component.container.querySelector('form');

  fireEvent.click(hidden);
  fireEvent.submit(form);

  expect(hideCase.mock.calls).toHaveLength(1);
  expect(hideCase.mock.calls[0][0].hidden).toEqual(true);
});
