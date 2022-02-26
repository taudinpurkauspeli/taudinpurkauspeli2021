/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import NewOptionForm from '../../../App/subprocedure/components/interviewSubProcedure/NewOptionForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let newOptionFunc;

beforeEach(() => {
  newOptionFunc = jest.fn();
  const store = mockStore({
    options: [
      {
        id: 1,
        name: 'Already in store',
      },
    ],
  });
  render(
    <Provider store={store}>
      <NewOptionForm addOption={newOptionFunc} />
    </Provider>,
  );
});

describe('Adding a new option', () => {
  test('New option can be added', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 'testOption');
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(newOptionFunc).toHaveBeenCalledWith({
      name: 'testOption',
      description: 'testDescription',
      isRequired: 2,
    }));
  });

  test('New option can be selected', async () => {
    const selectField = screen.getByRole('combobox');
    selectField.focus();
    await waitFor(() => fireEvent.change(selectField, { target: { value: 'A' } }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByLabelText(/voluntary/i));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(newOptionFunc).toHaveBeenCalledWith({
      id: 1,
      name: 'Already in store',
      description: 'testDescription',
      isRequired: 1,
    }));
  });

  test('Option with a too short name cannot be created', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 't');
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningShort');
    expect(alert).toBeInTheDocument();
    expect(newOptionFunc.mock.calls).toHaveLength(0);
  });

  test('Option with no name cannot be created', async () => {
    userEvent.type(screen.getByRole(/combobox/i), '');
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningRequired');
    expect(alert).toBeInTheDocument();
    expect(newOptionFunc.mock.calls).toHaveLength(0);
  });
});
