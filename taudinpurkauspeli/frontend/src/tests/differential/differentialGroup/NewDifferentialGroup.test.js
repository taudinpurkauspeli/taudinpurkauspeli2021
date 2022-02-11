/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import NewDifferentialGroup from '../../../App/differential/components/differentialGroup/NewDifferentialGroup';
import service from '../../../App/differential/services/differentialGroups';
import createStore from '../../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

beforeEach(() => {
  render(
    <Provider store={store}>
      <NewDifferentialGroup caseId={1} />
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { id: /addNew/i }));
});

test('New differential group window is rendered', async () => {
  await waitFor(() => expect(screen.getByLabelText(/addDifferentialGroup/i)).toBeInTheDocument());
});
