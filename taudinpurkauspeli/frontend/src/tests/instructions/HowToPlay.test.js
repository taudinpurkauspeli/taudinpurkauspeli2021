/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import DiseaseExample from '../components/disease-example';

test('renders content', () => {
  const note = {
    content: 'Test the content of instructions',
    important: true,
  };

  const component = render(
    <DiseaseExample note={note} />,
  );

  expect(component.container).toHaveTextContent(
    'Pelin tarkoitus on opetella taudinpurkaukseen tarvittavaa ajattelumallia.',
  );
});
