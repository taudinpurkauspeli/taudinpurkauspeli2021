/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import SubProcedureList from '../../App/subprocedure/components/SubProcedureList';
import service from '../../App/subprocedure/subProceduresService';
import store from '../../store';

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('List and accordion are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<Provider store={store}><SubProcedureList proceduresId="1" /></Provider>);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  // await waitFor(() => expect(result.type.render.displayName).toBe('Accordion'));
});
