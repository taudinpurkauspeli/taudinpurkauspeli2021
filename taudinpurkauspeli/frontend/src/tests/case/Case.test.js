/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Case from '../../App/case/components/Case';

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
});
