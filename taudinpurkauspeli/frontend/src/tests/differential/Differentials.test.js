/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Differentials from '../../App/differential/components/Differentials';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id/differentials' }),
}));

test('Differentials are rendered', async () => {
  const testDifferentials = render(<Differentials caseId={1} />);
  await waitFor(() => expect(testDifferentials.getByText('Differentials')).toBeInTheDocument());
});
