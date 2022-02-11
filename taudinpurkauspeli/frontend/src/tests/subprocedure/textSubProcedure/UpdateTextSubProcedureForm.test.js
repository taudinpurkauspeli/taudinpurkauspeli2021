/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdateTextSubProcedureForm from '../../../App/subprocedure/components/textSubProcedure/UpdateTextSubProcedureForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let handleTextSubProcedureUpdate;

beforeEach(() => {
  handleTextSubProcedureUpdate = jest.fn();
  render(
    <UpdateTextSubProcedureForm title="Testtitle" text="Testtext" handleTextSubProcedureUpdate={handleTextSubProcedureUpdate} />,
  );
});

describe('Updating a text subprocedure', () => {
  test('Text subprocedure can be updated', async () => {
    const title = screen.getByLabelText(/title/i);
    title.setSelectionRange(0, 9);
    userEvent.type(title, '{backspace}New testtitle');
    const text = screen.getByLabelText(/textToAdd/i);
    text.setSelectionRange(0, 8);
    userEvent.type(text, '{backspace}New testtext');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(handleTextSubProcedureUpdate).toHaveBeenCalledWith({
      title: 'New testtitle',
      text: 'New testtext',
    }));
  });

  test('If the new title is too short, subprocedure will not be updated', async () => {
    const title = screen.getByLabelText(/title/i);
    title.setSelectionRange(0, 9);
    userEvent.type(title, '{backspace}T');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    const alert = await screen.findByRole('alert', { name: /From Feedback/i });
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('warningShort');
    expect(handleTextSubProcedureUpdate.mock.calls).toHaveLength(0);
  });

  test('Subprocedure cannot be updated with an empty title', async () => {
    const title = screen.getByLabelText(/title/i);
    title.setSelectionRange(0, 9);
    userEvent.type(title, '{backspace}');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    const alert = await screen.findByRole('alert', { name: /From Feedback/i });
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('warningRequired');
    expect(handleTextSubProcedureUpdate.mock.calls).toHaveLength(0);
  });
});
