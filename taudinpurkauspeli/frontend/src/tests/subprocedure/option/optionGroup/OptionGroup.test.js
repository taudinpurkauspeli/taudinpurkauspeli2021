/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import OptionGroup from '../../../../App/subprocedure/components/option/optionGroup/OptionGroup';
import createStore from '../../../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Option group card is rendered', async () => {
  render(
    <Provider store={store}>
      <OptionGroup name="testGroup" />
    </Provider>,
  );
  await waitFor(() => expect(screen.getByText(/testGroup/i)).toBeInTheDocument());
});
