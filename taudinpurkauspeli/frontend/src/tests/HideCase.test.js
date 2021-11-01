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

test('<HideCase /> updates parent state and calls onSubmit', () => {
  const hideCase = jest.fn();

  const component = render(
    <HideCase caseToBeHidden={cases} hideCaseFunc={hideCase} />,
  );

  const form = component.container.querySelector('form');
  const hidden = component.container.querySelector('#submit');

  fireEvent.click(hidden);
  fireEvent.submit(form);

  // Ongelma: jos klikataan buttonia ja sitten submitataan lomake,
  // tallennetaan KAKSI oliota. Niissä on eri hidden-arvot.
  // Jos vain toinen toteutetaan, niin silloin testaus ei myöskään
  // toimi.
  console.log(hideCase.mock.calls);
  expect(hideCase.mock.calls).toHaveLength(1);
  expect(hideCase.mock.calls[1][0].hidden).toEqual(true);
});
