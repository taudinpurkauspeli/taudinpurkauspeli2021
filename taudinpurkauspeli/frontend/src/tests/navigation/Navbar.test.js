/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/' }),
}));

test('Navbar is rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<Navbar />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type.displayName).toBe('Navbar'));
});

test('The change language dropdown is being rendered', () => {
  const component = render(
    <Router>
      <Navbar />
    </Router>,
  );
  expect(component.container.querySelector('#selectLanguage')).toBeInTheDocument();
});
