/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddDifferentialGroupForm from '../../../App/differential/differentialGroup/AddDifferentialGroupForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let addDifferentialGroupFunc;

beforeEach(() => {
  addDifferentialGroupFunc = jest.fn();
  render(
    <AddDifferentialGroupForm addDifferentialGroup={addDifferentialGroupFunc} />,
  );
});

describe('Adding a new differential group', () => {
  test('New differential group can be added', async () => {
    userEvent.type(screen.getByLabelText(/addDifferentialGroup/i), 'testDifferentialGroup');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addDifferentialGroupFunc).toHaveBeenCalledWith({
      name: 'testDifferentialGroup',
    }));
  });

  test('Differential group with a too short name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/addDifferentialGroup/i), 't');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByRole('alert', { name: /From Feedback/i });
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('warningShort');
    expect(addDifferentialGroupFunc.mock.calls).toHaveLength(0);
  });

  test('Differential group with no name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/addDifferential/i), '');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByRole('alert', { name: /From Feedback/i });
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('warningRequired');
    expect(addDifferentialGroupFunc.mock.calls).toHaveLength(0);
  });
});
