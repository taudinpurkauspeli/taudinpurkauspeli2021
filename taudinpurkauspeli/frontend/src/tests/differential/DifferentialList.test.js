/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import ShallowRenderer from 'react-shallow-renderer';
import { waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import DifferentialList from '../../App/differential/components/DifferentialList';

const mockStore = configureStore([]);

test('List and accordion are rendered', async () => {
  const store = mockStore({
    differentialsUnderCase: [{
      diffGroupCaseId: 1,
      id: 1,
      name: 'Test',
      description: 'Test',
    }],
  });
  const result = render(
    <Provider store={store}>
      <DifferentialList diffGroupCaseId={Number('1')} />
    </Provider>,
  );
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.container.querySelector('.accordion')).toBeDefined());
});
