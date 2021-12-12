/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdateTextSubProcedure from '../../components/subprocedure/UpdateTextSubProcedure';
import service from '../../services/procedures/subProcedures';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

beforeEach(() => {
  render(
    <UpdateTextSubProcedure title="Testtitle" text="Testtext" id={1} />,
  );

  userEvent.click(screen.getByRole('button', { name: /buttonEdit/i }));
});

test('New update window is rendered', async () => {
  await waitFor(() => expect(screen.getByText(/updateSubProcedure/i)).toBeInTheDocument());
});
