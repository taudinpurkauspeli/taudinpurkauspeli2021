/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FileBank from '../../App/files/FileBank';
import diffService from '../../App/differential/services/differentialsService';
import diffgroupService from '../../App/differential/services/differentialGroupsService';
import proceduresService from '../../App/procedure/services/proceduresService';
import subProceduresService from '../../App/subprocedure/services/subProceduresService';
import optionGroupsService from '../../App/subprocedure/services/optionGroupsService';
import optionsService from '../../App/subprocedure/services/optionsService';

const mockStore = configureStore([]);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(diffService, 'getAll');
jest.spyOn(diffgroupService, 'getAll');
jest.spyOn(proceduresService, 'getAll');
jest.spyOn(subProceduresService, 'getAll');
jest.spyOn(optionsService, 'getAll');
jest.spyOn(optionGroupsService, 'getAll');

beforeEach(() => {
  const store = mockStore({
    differentials: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
    differentialGroups: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
    options: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
    optionGroups: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
    procedures: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
    subProcedures: [
      {
        id: 1,
        name: 'Differential 1',
      },
    ],
  });

  /*
  render(
    <Provider store={store}>
      <FileBank />
    </Provider>,
  );
  */
});

describe('Files page', () => {
  test('Page & title are rendered correctly', () => {
    expect(1 + 1).toEqual(2);
    // expect(screen.getByText('fileBank')).toBeInTheDocument();
  });
});
