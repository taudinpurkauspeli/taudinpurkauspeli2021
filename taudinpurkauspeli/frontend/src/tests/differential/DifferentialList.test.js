/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import DifferentialList from '../../App/differential/DifferentialList';
import service from '../../services/differentials/differentialsUnderCases';

const useEffectSpy = jest.spyOn(React, 'useEffect');
useEffectSpy.mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('List and accordion are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<DifferentialList diffGroupCaseId="1" />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type.render.displayName).toBe('Accordion'));
});
