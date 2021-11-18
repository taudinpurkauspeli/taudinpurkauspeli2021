/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, fireEvent, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDifferentialForm from '../../components/differential/SelectDifferentialForm';

const initialDifferentials = [{
  id: 1,
  name: 'testDifferential1',
},
{
  id: 2,
  name: 'testDifferential2',
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const selectDifferentialFunc = jest.fn();

beforeEach(() => {
  render(
    <SelectDifferentialForm
      differentials={initialDifferentials}
      selectDifferential={selectDifferentialFunc}
      caseId={1}
    />,
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
    caseId: 1,
    differentialId: 1,
    description: 'testDescription',
  }));
});
