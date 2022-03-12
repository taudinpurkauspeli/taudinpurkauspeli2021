/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AddDifferentialGroupForm from '../../../App/differential/components/differentialGroup/AddDifferentialGroupForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const addDifferentialGroupFunc = jest.fn();

beforeEach(() => {
  const store = mockStore({
    differentialGroups: [{
      id: 1,
      name: 'test',
    }],
  });
  render(
    <Provider store={store}>
      <AddDifferentialGroupForm addDifferentialGroup={addDifferentialGroupFunc} />
    </Provider>,
  );
});

describe('Adding a new differential group to the case', () => {
  test('New differential group can be added', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 'testDifferentialGroup');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addDifferentialGroupFunc).toHaveBeenCalledWith({
      name: 'testDifferentialGroup',
    }));
  });

  test('Differential group with a too short name cannot be created', async () => {
    userEvent.type(screen.getByRole(/combobox/i), 't');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningShort');
    expect(alert).toBeInTheDocument();
    expect(addDifferentialGroupFunc.mock.calls).toHaveLength(0);
  });

  test('Differential group with no name cannot be created', async () => {
    userEvent.type(screen.getByRole(/combobox/i), '');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningRequired');
    expect(alert).toBeInTheDocument();
    expect(addDifferentialGroupFunc.mock.calls).toHaveLength(0);
  });

  test('New differential group can be selected', async () => {
    const selectField = screen.getByRole('combobox');
    selectField.focus();
    await waitFor(() => fireEvent.change(selectField, { target: { value: 't' } }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addDifferentialGroupFunc).toHaveBeenCalledWith({ id: 1, name: 'test' }));
  });
});
