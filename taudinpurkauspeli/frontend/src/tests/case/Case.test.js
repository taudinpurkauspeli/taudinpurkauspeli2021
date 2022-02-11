/* eslint-disable no-undef */
// https://testing-library.com/docs/example-react-router/
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Case from '../../App/case/components/Case';
import createStore from '../../store';
import diffService from '../../App/differential/services/differentials';
import diffgroupService from '../../App/differential/services/differentialGroups';
import diffsUnderCaseService from '../../App/differential/services/differentialsUnderCases';
import diffgroupsUnderCaseService from '../../App/differential/services/differentialGroupsUnderCases';
import proceduresService from '../../App/procedure/proceduresService';
import subProceduresService from '../../App/subprocedure/subProceduresService';
import proceduresUnderCaseService from '../../App/procedure/proceduresUnderCaseService';

const { store } = createStore();

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
jest.spyOn(diffService, 'getAll');
jest.spyOn(diffgroupService, 'getAll');
jest.spyOn(diffsUnderCaseService, 'getAll');
jest.spyOn(diffgroupsUnderCaseService, 'getAll');
jest.spyOn(proceduresService, 'getAll');
jest.spyOn(subProceduresService, 'getAll');
jest.spyOn(proceduresUnderCaseService, 'getAll');

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
