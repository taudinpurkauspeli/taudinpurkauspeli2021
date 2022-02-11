/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Differential from '../../App/differential/components/Differential';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Differential card is rendered', async () => {
  render(<Differential name="testDiff" id="2" description="Testing out" />);
  await waitFor(() => expect(screen.getByText(/testDiff/i)).toBeInTheDocument());
});
