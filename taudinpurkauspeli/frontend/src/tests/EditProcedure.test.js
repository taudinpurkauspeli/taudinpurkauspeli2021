/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import EditProcedure from '../components/case/EditProcedure';

const procedure = {
  title: 'Epidemia vai ei?',
  proceduresUnderCase: {
    caseId: 1,
    procedureId: 1,
    priority: 1,
  },
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

// Checking if form inputs work as intended
test('<EditProcedure /> updates parent state and calls onSubmit', () => {
  const editProcedure = jest.fn();

  const component = render(
    <EditProcedure procedure={procedure} editCaseFunc={editProcedure} />,
  );
  const title = component.container.querySelector('#title');
  const priority = component.container.querySelector('#priority');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { defaultValue: 'On epidemia kyseessä' },
  });
  fireEvent.change(priority, {
    target: { defaultValu: 2 },
  });
  fireEvent.submit(form);

  expect(editProcedure.mock.calls).toHaveLength(1);
  expect(editProcedure.mock.calls[0][0]).toEqual(true);
});
