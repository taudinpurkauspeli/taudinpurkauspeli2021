/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewCase from '../../components/case/NewCase';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('<AddCase /> updates parent state and calls onSubmit', async () => {
  const addCase = jest.fn();

  render(<NewCase addCaseFunc={addCase} />);

  userEvent.type(screen.getByLabelText(/caseTitle/i), 'testTitle');
  userEvent.type(screen.getByLabelText(/caseAnamnesis/i), 'testAnamnesis');
  userEvent.click(screen.getByLabelText(/hideCase/i));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(addCase).toHaveBeenCalledWith({
    title: 'testTitle',
    anamnesis: 'testAnamnesis',
    hidden: true,
  }));
});

test('Case with invalid name cannot be created', async () => {
  const addCase = jest.fn();

  render(<NewCase addCaseFunc={addCase} />);

  userEvent.type(screen.getByLabelText(/caseTitle/i), 't');
  userEvent.type(screen.getByLabelText(/caseAnamnesis/i), 'testAnamnesis');
  userEvent.click(screen.getByLabelText(/hideCase/i));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(addCase.mock.calls).toHaveLength(0));
});
