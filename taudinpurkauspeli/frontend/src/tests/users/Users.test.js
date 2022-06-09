/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Users from '../../App/users/Users';
import createStore from '../../store';

const { store } = createStore();

let component;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  component = render(
    <Provider store={store}>
      <Users />
    </Provider>,
  );
});

describe('Files page', () => {
  test('Page & title are rendered correctly', () => {
    expect(component.getByText('userInformation')).toBeInTheDocument();
    expect(component.container.querySelector('#wrapper')).toBeInTheDocument();
  });
});
