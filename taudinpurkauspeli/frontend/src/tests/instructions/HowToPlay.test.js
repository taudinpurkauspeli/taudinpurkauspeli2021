/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-shallow-renderer';
import { waitFor, render } from '@testing-library/react';
import HowToPlay from '../../components/instructions/HowToPlay';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('renders instructions', () => {
  const component = render(
    <HowToPlay />,
  );
  expect(component.container).toHaveTextContent(
    'howToPlay',
  );
});

test('Instructions are rendered', async () => {
  const resultA = new ShallowRenderer();
  resultA.render(<HowToPlay />);
  const result = resultA.getRenderOutput();
  await waitFor(() => expect(result).toBeDefined());
  await waitFor(() => expect(result.type).toBe('div'));
});

test('Instruction header can be found', async () => {
  const resultA = render(<HowToPlay />);
  await waitFor(() => expect(resultA.getByText('howToPlay')).toBeInTheDocument());
});
