/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from '../../App/navigation/Navbar';
import store from '../../store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/' }),
}));

test('Navbar is rendered', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>,
  );
});

test('The change language dropdown is being rendered', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>,
  );
  expect(component.container.querySelector('#selectLanguage')).toBeInTheDocument();
});
