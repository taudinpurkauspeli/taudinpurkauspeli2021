/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../../store';
import Procedures from '../../App/procedure/components/Procedures';

const { store } = createStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id/procedures' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('List and accordion are rendered', async () => {
  render(
    <Provider store={store}>
      <Procedures />
    </Provider>,
  );

  await waitFor(() => expect(screen.getByText(/procedures/i)).toBeInTheDocument());
});
