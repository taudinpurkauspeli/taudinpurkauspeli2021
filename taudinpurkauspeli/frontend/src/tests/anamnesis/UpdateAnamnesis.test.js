/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import UpdateAnamnesis from '../../App/anamnesis/UpdateAnamnesis';

const testCase = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Case Anamnesis', () => {
  test('case anamnesis can be updated to another valid anamnesis', async () => {
    const updateCase = jest.fn();
    const updateForm = render(
      <UpdateAnamnesis c={testCase} updateAnamnesis={updateCase} />,
    );

    const input = updateForm.container.querySelector('textarea');

    fireEvent.change(input, {
      target: { value: 'updatedAnamnesis' },
    });
    fireEvent.click(screen.getByRole('button', { id: /submit/i }));

    await waitFor(() => expect(screen.getByDisplayValue('updatedAnamnesis')).toBeInTheDocument());
  });
});
