/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import AddConclusionSubProcedureForm from '../../../App/subprocedure/components/conclusionSubProcedure/AddConclusionSubProcedureForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const addSubFunc = jest.fn();

beforeEach(() => {
  const store = mockStore({
    differentialsUnderCase: [
      {
        id: 1,
        name: 'Differential 1',
      },
      {
        id: 2,
        name: 'Differential 2',
      },
    ],
  });

  render(
    <Provider store={store}>
      <AddConclusionSubProcedureForm addSubProcedure={addSubFunc} />
    </Provider>,
  );
});

describe('Adding a new conclusion sub procedure', () => {
  test('New conclusion sub procedure can be added', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'testConclusionSubProcedure');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '1');
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Differential 1' }),
    );
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addSubFunc).toHaveBeenCalledWith({
      priority: 1,
      differentialId: 1,
      text: 'testText',
      name: 'testConclusionSubProcedure',
      type: 'CONCLUSION',
    }));
  });

  test('Conclusion subprocedure with a too short name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 't');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Differential 1' }),
    );
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningShort');
    expect(addSubFunc.mock.calls).toHaveLength(0);
  });

  test('Conclusion sub procedure with no name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Differential 1' }),
    );
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningRequired');
    expect(addSubFunc.mock.calls).toHaveLength(0);
  });

  test('Conclusion sub procedure with no selected differential cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'testConclusionSubProcedure');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[2]).toHaveTextContent('warningRequired');
    expect(addSubFunc.mock.calls).toHaveLength(0);
  });

  test('Conclusion sub procedure with invalid priority differential cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'testConclusionSubProcedure');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), 'h');
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Differential 1' }),
    );
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[1]).toHaveTextContent('warningPositiveInteger');
    expect(addSubFunc.mock.calls).toHaveLength(0);
  });
});
