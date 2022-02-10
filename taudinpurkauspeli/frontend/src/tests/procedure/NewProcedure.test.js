/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import NewProcedure from '../../App/procedure/components/NewProcedure';
import createStore from '../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  render(
    <Provider store={store}>
      <NewProcedure caseId={1} />
    </Provider>,
  );
});

test('New procedure window is rendered', async () => {
  userEvent.click(screen.getByRole('button', { id: /addNew/i }));
  await waitFor(() => expect(screen.getByLabelText(/procedureTitle/i)).toBeInTheDocument());
});
