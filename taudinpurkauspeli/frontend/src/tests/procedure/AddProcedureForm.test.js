/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProcedureForm from '../../App/procedure/components/AddProcedureForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('<AddProcedure /> updates parent state and calls onSubmit', async () => {
  const addProcedure = jest.fn();

  render(<AddProcedureForm addProcedure={addProcedure} />);

  userEvent.type(screen.getByLabelText(/procedureTitle/i), 'testTitle');
  userEvent.click(screen.getByRole('button', { id: /submit/i }));

  await waitFor(() => expect(addProcedure).toHaveBeenCalledWith({
    name: 'testTitle',
  }));
});
