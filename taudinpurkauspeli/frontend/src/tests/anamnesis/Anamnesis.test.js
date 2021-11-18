/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import Anamnesis from '../../components/anamnesis/Anamnesis';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const testCase = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};

let studentView;

beforeEach(() => {
  studentView = render(
    <Anamnesis c={testCase} admin={false} />,
  );
});

test('student cannot change the title', () => {
  expect(studentView.container.querySelector('input')).toBeNull();
});

test('Anamnesis can be seen', () => {
  expect(screen.getByText(/Koirilla on havaittu/i)).toBeInTheDocument();
});
