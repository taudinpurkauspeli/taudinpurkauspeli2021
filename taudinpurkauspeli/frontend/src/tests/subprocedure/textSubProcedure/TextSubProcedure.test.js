/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import TextSubProcedure from '../../../App/subprocedure/components/textSubProcedure/TextSubProcedure';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const d = {
  title: 'testTextSubProcedure',
  text: 'just testing...',
  id: 2,
};

test('Text sub procedure card is rendered', async () => {
  render(<TextSubProcedure d={d} />);
  await waitFor(() => expect(screen.getByText(/testTextSubProcedure/i)).toBeInTheDocument());
});
