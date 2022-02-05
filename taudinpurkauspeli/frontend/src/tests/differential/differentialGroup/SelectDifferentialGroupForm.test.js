/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, fireEvent, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import SelectDifferentialForm from '../../../App/differential/components/differentialGroup/SelectDifferentialGroupForm';
import store from '../../../store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const selectDifferentialGroupFunc = jest.fn();

beforeEach(() => {
  render(
    <Provider store={store}>
      <SelectDifferentialForm
        selectDifferentialGroup={selectDifferentialGroupFunc}
      />
    </Provider>,
  );
});

test('New differential group can be selected', async () => {
  const selectField = screen.getByRole('combobox');
  selectField.focus();
  await waitFor(() => fireEvent.change(selectField, { target: { value: 't' } }));
  await waitFor(() => fireEvent.keyDown(selectField, { key: 'ArrowDown' }));
  await waitFor(() => fireEvent.keyDown(selectField, { key: 'Enter' }));

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(selectDifferentialGroupFunc).toHaveBeenCalledWith({
    differentialGroupId: 1,
  }));
});
