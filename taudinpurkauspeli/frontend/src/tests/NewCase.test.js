/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewCase from '../components/case/NewCase';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('<AddCase /> updates parent state and calls onSubmit', () => {
  const addCase = jest.fn();

  const component = render(
    <NewCase addCaseFunc={addCase} />,
  );

  const title = component.container.querySelector('#title');
  const anamnesis = component.container.querySelector('#anamnesis');
  const hidden = component.container.querySelector('#hidden');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testicase' },
  });
  fireEvent.change(anamnesis, {
    target: { value: 'testianamneesi' },
  });
  fireEvent.click(hidden, {
    target: { value: 'true' },
  });
  fireEvent.submit(form);

  expect(addCase.mock.calls).toHaveLength(1);
  expect(addCase.mock.calls[0][0].title).toBe('testicase');
  expect(addCase.mock.calls[0][0].anamnesis).toBe('testianamneesi');
  expect(addCase.mock.calls[0][0].hidden).toEqual('true');
});
