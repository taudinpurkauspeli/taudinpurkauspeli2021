/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewProcedure from '../components/case/NewProcedure';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('<AddProcedure /> updates parent state and calls onSubmit', () => {
  const addProcedure = jest.fn();
  const id = 1;

  const component = render(
    <NewProcedure id={id} addProcedureFunc={addProcedure} />,
  );

  const title = component.container.querySelector('#title');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testicase' },
  });
  fireEvent.submit(form);

  expect(addProcedure.mock.calls).toHaveLength(1);
  expect(addProcedure.mock.calls[0][0].title).toBe('testicase');
});
