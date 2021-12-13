/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Anamnesis from '../../components/anamnesis/Anamnesis';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id' }),
}));

const cases = [{
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
}];

let studentView;

beforeEach(() => {
  studentView = render(
    <MemoryRouter>
      <Anamnesis cases={cases} admin={false} />
    </MemoryRouter>,
  );
});

test('student cannot change the title', () => {
  expect(studentView.container.querySelector('input')).toBeNull();
});
