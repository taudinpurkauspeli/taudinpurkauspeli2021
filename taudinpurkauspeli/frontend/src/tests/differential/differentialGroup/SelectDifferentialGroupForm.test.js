/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, fireEvent, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDifferentialForm from '../../../components/differential/differentialGroup/SelectDifferentialGroupForm';

const initialDifferentialGroups = [{
  id: 1,
  name: 'testDifferentialGroup1',
},
{
  id: 2,
  name: 'testDifferentialGroup2',
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const selectDifferentialGroupFunc = jest.fn();

beforeEach(() => {
  render(
    <SelectDifferentialForm
      differentialGroups={initialDifferentialGroups}
      selectDifferentialGroup={selectDifferentialGroupFunc}
      caseId={1}
    />,
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
    caseId: 1,
    differentialGroupId: 1,
  }));
});
