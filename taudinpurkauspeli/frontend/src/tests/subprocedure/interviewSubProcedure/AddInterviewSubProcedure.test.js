/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddInterviewSubProcedure from '../../../App/subprocedure/components/interviewSubProcedure/AddInterviewSubProcedure';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let addIntSubFunc;

beforeEach(() => {
  addIntSubFunc = jest.fn();
  render(
    <AddInterviewSubProcedure handleSubProcedureAdd={addIntSubFunc} />,
  );
});

describe('Adding a new interview sub procedure', () => {
  test('New interview sub procedure can be added', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'testInterviewSubProcedure');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addIntSubFunc).toHaveBeenCalledWith({
      priority: 42,
      title: 'testInterviewSubProcedure',
      type: 'INTERVIEW',
    }));
  });

  test('Interview subprocedure with a too short name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 't');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningShort');
    expect(addIntSubFunc.mock.calls).toHaveLength(0);
  });

  test('Interview sub procedure with no name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningRequired');
    expect(addIntSubFunc.mock.calls).toHaveLength(0);
  });

  test('Interview subprocedure with no priority cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'test');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[1]).toHaveTextContent('warningRequired');
    expect(addIntSubFunc.mock.calls).toHaveLength(0);
  });
});
