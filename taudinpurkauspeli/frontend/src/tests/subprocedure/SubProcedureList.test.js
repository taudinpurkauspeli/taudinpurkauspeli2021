/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import SubProcedureList from '../../components/subprocedure/SubProcedureList';
import service from '../../services/procedures/subProcedures';

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('List and accordion are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<SubProcedureList proceduresId="1" />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type.render.displayName).toBe('Accordion'));
});
