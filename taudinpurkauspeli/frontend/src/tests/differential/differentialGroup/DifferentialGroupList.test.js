/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DifferentialGroupList from '../../../components/differential/differentialGroup/DifferentialGroupList';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('Differentials are rendered', async () => {
  const testDifferentials = render(<DifferentialGroupList caseId={1} />);
  expect(testDifferentials.getByTestId('diffGroupList')).toBeInTheDocument();
});
