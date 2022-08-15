/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTextSubProcedure from '../../../App/subprocedure/components/textSubProcedure/AddTextSubProcedure';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const addTextSubFunc = jest.fn();

beforeEach(() => {
  render(
    <AddTextSubProcedure addSubProcedure={addTextSubFunc} />,
  );
});

describe('Adding a new text sub procedure', () => {
  test('New text sub procedure can be added', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'testTextSubProcedure');
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(addTextSubFunc).toHaveBeenCalledWith({
      priority: 42,
      text: 'testText',
      name: 'testTextSubProcedure',
      type: 'TEXT',
    }));
  });

  test('Text subprocedure with a too short name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 't');
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningShort');
    expect(addTextSubFunc.mock.calls).toHaveLength(0);
  });

  test('Tex sub procedure with no name cannot be created', async () => {
    userEvent.type(screen.getByLabelText(/textToAdd/i), 'testText');
    userEvent.type(screen.getByLabelText(/subProcedurePriority/i), '42');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const alert = await screen.findAllByRole('alert', { name: /From Feedback/i });
    expect(alert[0]).toHaveTextContent('warningRequired');
    expect(addTextSubFunc.mock.calls).toHaveLength(0);
  });
});
