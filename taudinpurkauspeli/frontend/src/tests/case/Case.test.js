/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Case from '../../components/case/Case';
import serviceUnderCases from '../../services/differentialsUnderCases';

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

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(serviceUnderCases, 'getAll');

describe('Case pages', () => {
  test('case is rendered', () => {
    render(
      <MemoryRouter>
        <Case cases={cases} />
      </MemoryRouter>,
    );
  });

  test('case view includes navigation for anamnesis, procedures and differentials', () => {
    const caseView = render(
      <MemoryRouter>
        <Case cases={cases} />
      </MemoryRouter>,
    );

    expect(caseView.getByText('caseAnamnesis')).toBeInTheDocument();
    expect(caseView.getByText('caseProcedures')).toBeInTheDocument();
    expect(caseView.getByText('caseDifferentials')).toBeInTheDocument();
  });

  test('case navigating works', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Case cases={cases} />
      </Router>,
    );

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText('caseDifferentials'), leftClick);

    await waitFor(() => expect(screen.getByText('Differentials')).toBeInTheDocument());

    userEvent.click(screen.getByText('caseProcedures'), leftClick);

    await waitFor(() => expect(screen.getByText(/Toimenpiteet löytyvät/i)).toBeInTheDocument());

    userEvent.click(screen.getByText('caseAnamnesis'), leftClick);

    await waitFor(() => expect(screen.getByText(/Koirat/i)).toBeInTheDocument());
  });
});
