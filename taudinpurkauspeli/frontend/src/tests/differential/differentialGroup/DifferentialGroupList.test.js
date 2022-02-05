/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import DifferentialGroupList from '../../../App/differential/components/differentialGroup/DifferentialGroupList';
import store from '../../../store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Differentials are rendered', async () => {
  const testDifferentials = render(
    <Provider store={store}>
      <DifferentialGroupList caseId={1} />
    </Provider>,
  );
  await waitFor(() => expect(testDifferentials.getByTestId('diffGroupList')).toBeInTheDocument());
});
