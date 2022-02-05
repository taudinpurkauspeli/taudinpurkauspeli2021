/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import DifferentialList from '../../App/differential/components/DifferentialList';

test('List and accordion are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(
    <Provider store={store}>
      <DifferentialList diffGroupCaseId="1" />
    </Provider>,
  );
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type.render.displayName).toBe('Accordion'));
});
