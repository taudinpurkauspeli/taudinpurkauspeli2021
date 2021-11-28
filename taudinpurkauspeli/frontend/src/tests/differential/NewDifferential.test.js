/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewDifferential from '../../components/differential/NewDifferential';
import service from '../../services/differentials/differentials';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
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
