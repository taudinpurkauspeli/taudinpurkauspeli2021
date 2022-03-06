/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Option from '../../../App/subprocedure/components/option/Option';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const testOption = {
  id: 1,
  name: 'testOption',
  description: 'description',
  isRequired: 2,
};

test('Option card is rendered', async () => {
  render(<Option optionObject={testOption} />);
  await waitFor(() => expect(screen.getByText(/testOption/i)).toBeInTheDocument());
});
