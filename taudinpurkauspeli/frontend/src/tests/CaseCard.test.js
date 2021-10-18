import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CaseCard from '../components/CaseCard';

const caseCard = {
  title: 'Koirat sairaina',
  description: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
};

let component;

beforeEach(() => {
  component = render(
    <CaseCard title={caseCard.title} description={caseCard.description} />,
  );
});

test('renders title', () => {
  expect(component.container).toHaveTextContent(
    'Koirat sairaina',
  );
});

test('renders description', () => {
  expect(component.container).toHaveTextContent(
    'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  );
});

test('renders progressbar', () => {
  expect(
    component.container.querySelector('.progsbar'),
  ).toBeDefined();
});
