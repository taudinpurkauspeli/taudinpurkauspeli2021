/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Users from '../../App/users/Users';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Files page', () => {
  const usersView = render(<Users />);

  test('Page & title are rendered correctly', () => {
    expect(usersView.getByText('userInformation')).toBeInTheDocument();
    expect(usersView.container.querySelector('#wrapper')).toBeInTheDocument();
  });
});
