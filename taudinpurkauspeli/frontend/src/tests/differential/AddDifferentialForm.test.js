/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddDifferentialForm from '../../App/differential/components/AddDifferentialForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const addDifferentialFunc = jest.fn();

beforeEach(() => {
  const store = mockStore({
    differentials: [
      {
        id: 1,
        name: 'Test',
      },
    ],
    proceduresUnderCase: [
      {
        id: 1,
        name: 'Procedure 1',
      },
    ],
  });

  render(
    <Provider store={store}>
      <AddDifferentialForm addDifferential={addDifferentialFunc} />
    </Provider>,
  );
});

describe('Adding a new differential to the case', () => {
  test('New differential can be added', async () => {
    userEvent.type(screen.getAllByRole('combobox')[0], 'testDifferential');
    userEvent.selectOptions(
      screen.getAllByRole('combobox')[1],
      screen.getByRole('option', { name: 'Procedure 1' }),
    );
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addDifferentialFunc).toHaveBeenCalledWith({
      name: 'testDifferential',
      procedureId: 1,
      description: 'testDescription',
    }));
  });

  test('Differential with a too short name cannot be created', async () => {
    userEvent.type(screen.getAllByRole('combobox')[0], 't');
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningShort');
    expect(alert).toBeInTheDocument();
    expect(addDifferentialFunc.mock.calls).toHaveLength(0);
  });

  test('Differential with no name cannot be created', async () => {
    userEvent.type(screen.getAllByRole('combobox')[0], '');
    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findByText('warningRequired');
    expect(alert).toBeInTheDocument();
    expect(addDifferentialFunc.mock.calls).toHaveLength(0);
  });

  test('New differential can be selected', async () => {
    const selectField = screen.getAllByRole('combobox')[0];
    selectField.focus();
    await waitFor(() => fireEvent.change(selectField, { target: { value: 't' } }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
    await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

    userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addDifferentialFunc).toHaveBeenCalledWith({
      id: 1,
      name: 'Test',
      procedureId: NaN,
      description: 'testDescription',
    }));
  });
});
