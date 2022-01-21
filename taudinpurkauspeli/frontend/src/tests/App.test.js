/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line no-unused-vars
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import service from '../App/case/casesService';
import store from '../store';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('frontpage is valid for student', () => {
  const thisIsTrue = true;
  const thisIsFalse = false;
  const component = render(
    <Provider store={store}>
      <App
        user={thisIsTrue}
        admin={thisIsFalse}
      />
    </Provider>,
  );
  const element = component.getByText(
    'Etusivu',
  );
  expect(element).toBeDefined();
});
