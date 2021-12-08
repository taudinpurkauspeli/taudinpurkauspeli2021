/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import TextSubProcedure from '../../components/subprocedure/TextSubProcedure';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Text sub procedure card is rendered', async () => {
  render(<TextSubProcedure id="2" title="testTextSubProcedure" text="Testing out" />);
  await waitFor(() => expect(screen.getByText(/testTextSubProcedure/i)).toBeInTheDocument());
});
