/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Profile from '../../components/user/Profile';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('User page', () => {
  const profileView = render(<Profile />);

  test('Page & title are rendered correctly', () => {
    expect(profileView.getByText('userProfile')).toBeInTheDocument();
    expect(profileView.container.querySelector('#wrapper')).toBeInTheDocument();
  });
});
