/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OptionGroupList from '../../../../App/subprocedure/components/option/optionGroup/OptionGroupList';

const mockStore = configureStore([]);

const store = mockStore({
  optionGroupsUnderSubProcedure: [{
    optionGroupSubProcedureId: 1,
    subProcedureId: 1,
    id: 1,
    name: 'testGroup',
  }],
  optionsUnderSubProcedure: [{
    optionGroupSubProcedureId: 1,
    id: 1,
    description: 'description',
    name: 'testName',
  }],
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Option groups are rendered', async () => {
  const testOptionGroups = render(
    <Provider store={store}>
      <OptionGroupList subProcedureId={1} />
    </Provider>,
  );
  await waitFor(() => expect(testOptionGroups.getByTestId('optionGroupList')).toBeInTheDocument());
});
