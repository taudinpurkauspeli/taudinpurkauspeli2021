/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, fireEvent, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import userEvent from '@testing-library/user-event';
import SelectDifferentialForm from '../../App/differential/components/SelectDifferentialForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const selectDifferentialFunc = jest.fn();

beforeEach(() => {
  const store = mockStore({
    differentials: [
      {
        id: 1,
        name: 'Test',
      },
    ],
  });
  render(
    <Provider store={store}>
      <SelectDifferentialForm
        selectDifferential={selectDifferentialFunc}
        diffGroupCaseId={1}
      />
    </Provider>,
  );
});

test('New differential can be selected', async () => {
  const selectField = screen.getByRole('combobox');
  selectField.focus();
  await waitFor(() => fireEvent.change(selectField, { target: { value: 't' } }));
  await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
  await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

  userEvent.type(screen.getByLabelText(/description/i), 'testDescription');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(selectDifferentialFunc).toHaveBeenCalledWith({
    diffGroupCaseId: 1,
    differentialId: 1,
    description: 'testDescription',
  }));
});
