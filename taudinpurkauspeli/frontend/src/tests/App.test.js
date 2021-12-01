/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line no-unused-vars
import { render } from '@testing-library/react';
import App from '../App';
import service from '../services/cases';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('frontpage is valid for student', () => {
  const thisIsTrue = true;
  const thisIsFalse = false;
  const component = render(
    <App
      user={thisIsTrue}
      admin={thisIsFalse}
    />,
  );
  console.log(component.container);
  const element = component.getByText(
    'Etusivu',
  );
  expect(element).toBeDefined();
});
