/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import DiseaseExample from '../components/disease-example';

test('renders content', () => {
  const note = {
    content: 'Let us test the text content of the disease',
    important: true,
  };

  const component = render(
    <DiseaseExample note={note} />,
  );

  expect(component.container).toHaveTextContent(
    'Let us test the text content of the disease',
  );
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  const component = render(
    <DiseaseExample note={note} toggleImportance={mockHandler} />,
  );

  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
