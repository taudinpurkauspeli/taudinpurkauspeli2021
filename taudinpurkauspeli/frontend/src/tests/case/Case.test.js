/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Case from '../../App/case/components/Case';
import store from '../../store';

const cases = [{
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id/differentials' }),
}));

describe('Case pages', () => {
  test('case is rendered', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Case cases={cases} />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('case view includes navigation for anamnesis, procedures and differentials', () => {
    const caseView = render(
      <Provider store={store}>
        <MemoryRouter>
          <Case cases={cases} />
        </MemoryRouter>
      </Provider>,
    );

    expect(caseView.getByText('caseAnamnesis')).toBeInTheDocument();
    expect(caseView.getByText('caseProcedures')).toBeInTheDocument();
    expect(caseView.getByText('caseDifferentials')).toBeInTheDocument();
  });
});
