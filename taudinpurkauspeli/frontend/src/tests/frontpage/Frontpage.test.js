/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { Provider } from 'react-redux';

import Frontpage from '../../App/frontpage/Frontpage';
import createStore from '../../store';

const { store } = createStore();

let component;

const cases = [{
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
},
{
  id: 2,
  title: 'Lehmät levällään',
  anamnesis: 'Lehmät laiskottelee, eikä jaksa tehdä mitään',
  hidden: true,
},
{
  id: 3,
  title: 'Hepat hirnumassa',
  anamnesis: 'Hepat ovat karkuteillä, hae porkkanoita',
  hidden: false,
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Frontpage cases={cases} admin={false} />
      </MemoryRouter>
    </Provider>,
  );
});

test('frontpage header is rendered', () => {
  expect(component.container).toHaveTextContent(
    'frontpageTitle',
  );
});

test('add new case -button can be found by teacher', () => {
  const adminFrontpage = render(
    <Provider store={store}>
      <MemoryRouter>
        <Frontpage cases={cases} admin />
      </MemoryRouter>
    </Provider>,
  );

  const newCaseButton = adminFrontpage.getByText('buttonNewCase');
  expect(newCaseButton).toBeDefined();
});

test('add new case -button cannot be found by student', () => {
  const newCaseButton = component.queryByText('buttonNewCase');
  expect(newCaseButton).toBeNull();
});

test('student sees only non-hidden cases', () => {
  expect(
    component.queryByText('Koirat sairaina'),
  ).toBeDefined();
  expect(
    component.queryByText('Lehmät levällään'),
  ).toBeNull();
});

test('teacher can see all cases', () => {
  const adminFrontpage = render(
    <Provider store={store}>
      <MemoryRouter>
        <Frontpage cases={cases} admin />
      </MemoryRouter>
    </Provider>,
  );

  expect(
    adminFrontpage.queryAllByText('Koirat sairaina'),
  ).toBeDefined();
  expect(
    adminFrontpage.queryByText('Lehmät levällään'),
  ).toBeDefined();
});

test('student sees correct cases as search results', () => {
  const inputElement = document.getElementById('search');
  fireEvent.change(inputElement, { target: { value: 'Hepat' } });

  expect(
    component.queryByText('Hepat hirnumassa'),
  ).toBeDefined();
  expect(
    component.queryByText('Koirat sairaina'),
  ).toBeNull();
});
