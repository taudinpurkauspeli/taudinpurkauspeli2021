/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddDifferentialForm from '../../components/differential/AddDifferentialForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let addDifferentialFunc;

beforeEach(() => {
  addDifferentialFunc = jest.fn();
  render(
    <AddDifferentialForm addDifferential={addDifferentialFunc} />,
  );
});

test('New differential can be added', async () => {
  userEvent.type(screen.getByLabelText(/addDifferential/i), 'testDifferential');
  userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(addDifferentialFunc).toHaveBeenCalledWith({
    name: 'testDifferential',
    description: 'testDescription',
  }));
});

test('Differential with a too short name cannot be created', async () => {
  userEvent.type(screen.getByLabelText(/addDifferential/i), 't');
  userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  const alert = await screen.findByRole('alert', { name: /From Feedback/i });
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent('warningShort');
  expect(addDifferentialFunc.mock.calls).toHaveLength(0);
});

test('Differential with no name cannot be created', async () => {
  userEvent.type(screen.getByLabelText(/addDifferential/i), '');
  userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  const alert = await screen.findByRole('alert', { name: /From Feedback/i });
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent('warningRequired');
  expect(addDifferentialFunc.mock.calls).toHaveLength(0);
});
