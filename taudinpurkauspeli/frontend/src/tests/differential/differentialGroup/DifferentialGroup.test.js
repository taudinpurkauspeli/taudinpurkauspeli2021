/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import DifferentialGroup from '../../../App/differential/differentialGroup/DifferentialGroup';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Differential group card is rendered', async () => {
  render(<DifferentialGroup name="testGroup" />);
  await waitFor(() => expect(screen.getByText(/testGroup/i)).toBeInTheDocument());
});
