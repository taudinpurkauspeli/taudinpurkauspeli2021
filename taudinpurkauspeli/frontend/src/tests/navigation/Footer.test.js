import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Footer from '../../App/navigation/Footer';
import createStore from '../../store';

const { store } = createStore();

test('Footer is rendered', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Footer />
      </Router>
    </Provider>,
  );
});
