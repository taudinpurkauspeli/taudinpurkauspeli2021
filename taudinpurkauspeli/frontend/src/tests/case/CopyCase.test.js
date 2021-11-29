/* eslint-disable no-undef */
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import CopyCase from '../../components/case/CopyCase';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/cases/id/differentials' }),
}));

const c = {
  id: 1,
  title: 'Koirat sairaina',
  anamnesis: 'Koirilla on havaittu kuume, sinun täytyy selvittää syy',
  hidden: false,
};
const createProcedures = jest.fn();
const createDifferentials = jest.fn();

describe('Copycase works', () => {
  test('CopyCase is being rendered', () => {
    const component = render(
      <CopyCase
        caseToBeCopied={c}
        createProcedures={createProcedures}
        createDifferentials={createDifferentials}
      />,
    );
    expect(component.getByText('copy')).toBeInTheDocument();
  });

  /*  This test works, but only when backend is running. Thus it has been hidden from
  GitHub Actions.

    test('Procedures and differentials are copied to the new case', async () => {
    const component = render(
      <CopyCase
        caseToBeCopied={c}
        createProcedures={createProcedures}
        createDifferentials={createDifferentials}
      />,
    );

    const copyButton = component.container.querySelector('.copyButton');
    await fireEvent.click(copyButton);

    // expect(createDifferentials.mock.calls).toHaveLength(1);
    // await waitFor(() => expect(createProcedures.mock.calls).toHaveLength(1));
    // await waitFor(() => expect(createDifferentials.mock.calls).toHaveLength(1));
    await waitFor(() => expect(createDifferentials).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(createProcedures).toHaveBeenCalledTimes(1));
  }); */
});
