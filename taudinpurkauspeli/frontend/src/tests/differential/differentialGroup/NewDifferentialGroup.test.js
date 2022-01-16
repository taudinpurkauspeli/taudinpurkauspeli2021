/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewDifferentialGroup from '../../../App/differential/differentialGroup/NewDifferentialGroup';
import service from '../../../services/differentials/differentialGroups';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

beforeEach(() => {
  render(
    <NewDifferentialGroup caseId={1} />,
  );

  userEvent.click(screen.getByRole('button', { id: /addNew/i }));
});

test('New differential group window is rendered', async () => {
  await waitFor(() => expect(screen.getByLabelText(/addDifferentialGroup/i)).toBeInTheDocument());
});
