/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Differentials from '../../components/differential/Differentials';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Differentials are rendered', async () => {
  const testDifferentials = render(<Differentials caseId={1} admin />);
  await waitFor(() => expect(testDifferentials.getByText('Differentials')).toBeInTheDocument());
});
