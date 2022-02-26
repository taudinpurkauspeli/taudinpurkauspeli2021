/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import UpdateTextSubProcedure from '../../../App/subprocedure/components/textSubProcedure/UpdateTextSubProcedure';
import service from '../../../App/subprocedure/services/subProceduresService';
import createStore from '../../../store';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

const d = {
  title: 'testTextSubProcedure',
  text: 'just testing...',
  id: 2,
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <UpdateTextSubProcedure d={d} />
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: /buttonEdit/i }));
});

test('New update window is rendered', async () => {
  await waitFor(() => expect(screen.getByText(/updateSubProcedure/i)).toBeInTheDocument());
});
