/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../store';
import UpdateTextSubProcedure from '../../../App/subprocedure/components/textSubProcedure/UpdateTextSubProcedure';
import service from '../../../App/subprocedure/subProceduresService';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

beforeEach(() => {
  render(
    <Provider store={store}>
      <UpdateTextSubProcedure title="Testtitle" text="Testtext" id={1} />
    </Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: /buttonEdit/i }));
});

test('New update window is rendered', async () => {
  await waitFor(() => expect(screen.getByText(/updateSubProcedure/i)).toBeInTheDocument());
});
