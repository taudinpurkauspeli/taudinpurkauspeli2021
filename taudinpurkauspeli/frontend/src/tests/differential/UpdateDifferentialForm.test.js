/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UpdateDifferentialForm from '../../App/differential/components/UpdateDifferentialForm';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const updateDifferentialFunc = jest.fn();

beforeEach(() => {
  const store = mockStore({
    proceduresUnderCase: [
      {
        id: 1,
        name: 'Procedure 1',
      },
    ],
  });

  render(
    <Provider store={store}>
      <UpdateDifferentialForm name="TestName" description="TestDescription" procedureId={null} updateDifferential={updateDifferentialFunc} />
    </Provider>,
  );
});

describe('Updating a differential', () => {
  test('Differential description and procedureId can be updated', async () => {
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Procedure 1' }),
    );
    const description = screen.getByLabelText(/description/i);
    description.setSelectionRange(0, 15);
    userEvent.type(description, '{backspace}New Description');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(updateDifferentialFunc).toHaveBeenCalledWith({
      description: 'New Description',
      procedureId: 1,
    }));
  });

  test('Differential name cannot be changed', async () => {
    const name = screen.getByLabelText(/title/i);
    name.setSelectionRange(0, 9);
    userEvent.type(name, '{backspace}');
    userEvent.click(screen.getByRole('button', { name: /buttonUpdate/i }));

    await waitFor(() => expect(updateDifferentialFunc).toHaveBeenCalledWith({
      description: 'TestDescription',
      procedureId: NaN,
    }));
  });
});
