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
    const text = screen.getByLabelText(/textToAdd/i);
    text.setSelectionRange(0, 8);
    userEvent.type(text, '{backspace}New testtext');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(handleTextSubProcedureUpdate).toHaveBeenCalledWith({
      title: 'Testtitle',
      text: 'New testtext',
    }));
  });

  test('Subprocedure title cannot be changed', async () => {
    const title = screen.getByLabelText(/title/i);
    title.setSelectionRange(0, 9);
    userEvent.type(title, '{backspace}');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(handleTextSubProcedureUpdate).toHaveBeenCalledWith({
      title: 'Testtitle',
      text: 'Testtext',
    }));
  });
});
