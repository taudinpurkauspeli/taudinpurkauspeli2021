/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Differential from '../components/differential/Differential';
import differentials from '../services/differentials';
import differentialsUnderCases from '../services/differentialsUnderCases';

const initialDifferentials = [{
  name: 'Influenssa',
  description: 'kuume, flunssa, kaikkea muuta ikävää',
},
{
  name: 'Koronavirus',
  description: 'Ylähengitystieoireita, maku- ja hajuaistin menetys',
}];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('differential page is rendered', () => {
  const addDifferential = jest.fn();
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  jest.spyOn(differentials, 'getAll');
  jest.spyOn(differentialsUnderCases, 'getAll');
  render(
    <Differential admin caseId={1} addDifferentialFunc={addDifferential} />,
  );

  expect(differentials.getAll).toHaveBeenCalledTimes(1);
  expect(differentialsUnderCases.getAll).toHaveBeenCalledTimes(1);
});
