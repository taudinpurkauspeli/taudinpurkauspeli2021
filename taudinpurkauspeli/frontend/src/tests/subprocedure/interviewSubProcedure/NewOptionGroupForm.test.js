/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import NewOptionGroupForm from '../../../App/subprocedure/components/interviewSubProcedure/NewOptionGroupForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let newOptionGroupFunc;

beforeEach(() => {
  newOptionGroupFunc = jest.fn();
  const store = mockStore({
    optionGroups: [
      {
        id: 1,
        name: 'Already in store',
      },
    ],
  });
  render(
    <Provider store={store}>
      <NewOptionGroupForm addOptionGroup={newOptionGroupFunc} />
    </Provider>,
  );
});

describe('Adding a new optiongorup', () => {
  test('New optiongroup can be added', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 'testOptionGroup');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(newOptionGroupFunc).toHaveBeenCalledWith({
      name: 'testOptionGroup',
    }));
  });

  test('New optiongroup can be selected', async () => {
    const selectField = screen.getByRole('combobox');
    selectField.focus();
    await waitFor(() => fireEvent.change(selectField, { target: { value: 'A' } }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(newOptionGroupFunc).toHaveBeenCalledWith({
      id: 1,
      name: 'Already in store',
    }));
  });

  test('Optiongroup with a too short name cannot be created', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 't');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningShort');
    expect(alert).toBeInTheDocument();
    expect(newOptionGroupFunc.mock.calls).toHaveLength(0);
  });

  test('Optiongroup with no name cannot be created', async () => {
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningRequired');
    expect(alert).toBeInTheDocument();
    expect(newOptionGroupFunc.mock.calls).toHaveLength(0);
  });
});
