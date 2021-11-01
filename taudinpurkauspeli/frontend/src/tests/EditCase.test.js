/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import EditCase from '../components/case/EditCase';

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
  useRouteMatch: () => ({ url: '/editcase/id' }),
}));

// Checking if hidden checkbox works as intended
test('<EditCase /> updates parent state and calls onSubmit', () => {
  const editCase = jest.fn();

  const component = render(
    <EditCase cases={cases} editCaseFunc={editCase} />,
  );

  const hidden = component.container.querySelector('#hidden');
  const form = component.container.querySelector('form');

  fireEvent.click(hidden);
  fireEvent.submit(form);

  expect(editCase.mock.calls).toHaveLength(1);
  expect(editCase.mock.calls[0][0].hidden).toEqual(true);
});
