/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdateDifferentialForm from '../../App/differential/components/UpdateDifferentialForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const updateDifferentialFunc = jest.fn();

beforeEach(() => {
  render(
    <UpdateDifferentialForm name="TestName" description="TestDescription" updateDifferential={updateDifferentialFunc} />,
  );
});

describe('Updating a differential', () => {
  test('Differential description can be updated', async () => {
    const description = screen.getByLabelText(/description/i);
    description.setSelectionRange(0, 15);
    userEvent.type(description, '{backspace}New Description');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(updateDifferentialFunc).toHaveBeenCalledWith({
      description: 'New Description',
    }));
  });

  test('Differential name cannot be changed', async () => {
    const name = screen.getByLabelText(/title/i);
    name.setSelectionRange(0, 9);
    userEvent.type(name, '{backspace}');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(updateDifferentialFunc).toHaveBeenCalledWith({
      description: 'TestDescription',
    }));
  });
});
