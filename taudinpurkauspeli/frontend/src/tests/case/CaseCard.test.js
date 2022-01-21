/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CaseCard from '../../App/case/components/CaseCard';
import store from '../../store';

const caseCard = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};

let component;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  component = render(
    <Provider store={store}>
      <MemoryRouter>
        <CaseCard c={caseCard} admin={false} />
      </MemoryRouter>
    </Provider>,
  );
});

test('renders title', () => {
  expect(component.container).toHaveTextContent(
    'Koirat sairaina',
  );
});

test('renders description', () => {
  expect(component.container).toHaveTextContent(
    'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  );
});

test('renders progressbar', () => {
  expect(
    component.container.querySelector('.progsbar'),
  ).toBeDefined();
});

test('user does not see the delete and copy buttons', () => {
  expect(
    component.queryByText('buttonRemove'),
  ).toBeNull();
  expect(
    component.queryByText('copy'),
  ).toBeNull();
});

test('renders delete and copy buttons for teacher', () => {
  const teacherComponent = render(
    <Provider store={store}>
      <MemoryRouter>
        <CaseCard c={caseCard} admin />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    teacherComponent.getByText('buttonRemove'),
  ).toBeDefined();
  expect(
    teacherComponent.getByText('copy'),
  ).toBeDefined();
});
