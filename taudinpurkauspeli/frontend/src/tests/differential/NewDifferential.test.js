/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import NewDifferential from '../../App/differential/components/NewDifferential';
import createStore from '../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  render(
    <Provider store={store}>
      <NewDifferential caseId={1} />
    </Provider>,
  );
});

test('New differential window is rendered', async () => {
  userEvent.click(screen.getByRole('button', { id: /addNew/i }));
  await waitFor(() => expect(screen.getByLabelText(/addDifferential/i)).toBeInTheDocument());
});
