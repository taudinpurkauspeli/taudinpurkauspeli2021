/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import Sidebar from '../../components/navigation/Sidebar';

test('Sidebar is rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<Sidebar />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type).toBe('div'));
});
