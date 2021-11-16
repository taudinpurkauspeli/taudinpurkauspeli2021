/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import RemoveCase from '../../components/case/RemoveCase';

const cases = [{
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
},
];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/removecase/id' }),
}));

test('<RemoveCase /> deletes case when clicked', () => {
  const handleRemove = jest.fn();
  const component = render(
    <RemoveCase caseToBeRemoved={cases[0]} removeCaseFunc={handleRemove} />,
  );
  const button = component.container.querySelector('.removeButton');
  fireEvent.click(button);
  expect(handleRemove.mock.calls[0][0]).toEqual(1);
  expect(handleRemove.mock.calls[1][0]).toEqual(null);
  expect(handleRemove).toHaveBeenCalledTimes(2);
});
