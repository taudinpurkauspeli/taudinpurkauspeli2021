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
import diffService from '../../App/differential/services/differentialsService';
import diffgroupService from '../../App/differential/services/differentialGroupsService';
import diffsUnderCaseService from '../../App/differential/services/differentialsUnderCasesService';
import diffgroupsUnderCaseService from '../../App/differential/services/differentialGroupsUnderCasesService';
import proceduresService from '../../App/procedure/services/proceduresService';
import subProceduresService from '../../App/subprocedure/services/subProceduresService';
import proceduresUnderCaseService from '../../App/procedure/services/proceduresUnderCaseService';
import optionGroupsService from '../../App/subprocedure/services/optionGroupsService';
import optionGroupsUnderSubProceduresService from '../../App/subprocedure/services/optionGroupsUnderSubProceduresService';
import optionsService from '../../App/subprocedure/services/optionsService';
import optionsUnderSubProceduresService from '../../App/subprocedure/services/optionsUnderSubProceduresService';

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
jest.spyOn(optionsService, 'getAll');
jest.spyOn(optionGroupsService, 'getAll');
jest.spyOn(optionsUnderSubProceduresService, 'getAll');
jest.spyOn(optionGroupsUnderSubProceduresService, 'getAll');

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
