/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import Differential from '../../App/differential/components/Differential';
import createStore from '../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const differential = {
  id: 2,
  name: 'testDiff',
  description: 'testDescription',
};

test('Differential card is rendered', async () => {
  render(
    <Provider store={store}>
      <Differential d={differential} />
    </Provider>,
  );
  await waitFor(() => expect(screen.getByText(/testDiff/i)).toBeInTheDocument());
});
