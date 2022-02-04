/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewDifferential from '../../App/differential/components/NewDifferential';
import service from '../../App/differential/services/differentials';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

beforeEach(() => {
  render(
    <NewDifferential caseId={1} />,
  );

  userEvent.click(screen.getByRole('button', { id: /addNew/i }));
});

test('New differential window is rendered', async () => {
  await waitFor(() => expect(screen.getByLabelText(/addDifferential/i)).toBeInTheDocument());
});
