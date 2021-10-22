/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CaseCard from '../components/CaseCard';

const caseCard = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};

let component;
const admin = true;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  component = render(
    <MemoryRouter>
      <CaseCard c={caseCard} admin={admin} />
    </MemoryRouter>,
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
