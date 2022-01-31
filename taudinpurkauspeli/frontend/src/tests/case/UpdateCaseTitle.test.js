/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import UpdateCaseTitle from '../../App/case/components/UpdateCaseTitle';

const testCase = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Case title', () => {
  test('case title can be updated to another valid title', async () => {
    const updateCase = jest.fn();
    const updateForm = render(
      <UpdateCaseTitle c={testCase} updateCaseTitle={updateCase} />,
    );

    const input = updateForm.container.querySelector('input');
    const form = updateForm.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: 'updatedTitle' },
    });
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByDisplayValue('updatedTitle')).toBeInTheDocument());
  });

  test('updating title with invalid input is not possible', async () => {
    const updateCase = jest.fn();
    const updateForm = render(
      <UpdateCaseTitle c={testCase} updateCaseTitle={updateCase} />,
    );

    const input = updateForm.container.querySelector('input');
    const form = updateForm.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: '' },
    });
    fireEvent.submit(form);
    expect(input).toHaveValue('');

    const alert = await screen.findByRole('alert', { name: /From Feedback/i });
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('warningRequired');
  });
});
