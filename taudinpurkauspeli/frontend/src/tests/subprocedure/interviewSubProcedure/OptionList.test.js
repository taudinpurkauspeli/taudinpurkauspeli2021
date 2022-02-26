/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OptionList from '../../../App/subprocedure/components/interviewSubProcedure/OptionList';

const mockStore = configureStore([]);

test('List and accordion are rendered', async () => {
  const store = mockStore({
    optionsUnderSubProcedure: [{
      optionGroupSubProcedureId: 1,
      id: 1,
      description: 'description',
      name: 'testName',
    }],
  });

  const result = render(
    <Provider store={store}>
      <OptionList optionGroupSubProcedureId={1} />
    </Provider>,
  );
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.container.querySelector('.accordion')).toBeDefined());
});
