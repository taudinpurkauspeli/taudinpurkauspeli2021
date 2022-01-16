/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor } from '@testing-library/react';
import Procedures from '../../App/procedure/Procedures';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id/procedures' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('List and accordion are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<Procedures />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type).toBe('div'));
});
