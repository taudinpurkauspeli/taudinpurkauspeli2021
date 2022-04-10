/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../../../store';
import ConclusionSubProcedure from '../../../App/subprocedure/components/conclusionSubProcedure/ConclusionSubProcedure';

const { store } = createStore();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const d = {
  title: 'testConclusionSubProcedure',
  text: 'just testing...',
  id: 2,
};

test('Conclusion sub procedure card is rendered', async () => {
  render(
    <Provider store={store}>
      <ConclusionSubProcedure d={d} />
    </Provider>,
  );
  await waitFor(() => expect(screen.getByText(/testConclusionSubProcedure/i)).toBeInTheDocument());
});
