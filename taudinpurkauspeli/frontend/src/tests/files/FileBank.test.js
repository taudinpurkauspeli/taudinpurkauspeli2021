/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import FileBank from '../../components/files/FileBank';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Files page', () => {
  const filesView = render(<FileBank />);

  test('Page & title are rendered correctly', () => {
    expect(filesView.getByText('fileBank')).toBeInTheDocument();
    expect(filesView.container.querySelector('#wrapper')).toBeInTheDocument();
  });
});
