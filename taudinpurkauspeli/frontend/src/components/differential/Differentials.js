/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'react-bootstrap';
import serviceUnderCases from '../../services/differentialsUnderCases';
import NewDifferential from './NewDifferential';
import Differential from './Differential';

const Differentials = ({ admin, caseId }) => {
  const { t } = useTranslation();

  const [caseDifferentials, setCaseDifferentials] = useState([]);

  React.useEffect(() => {
    serviceUnderCases.getAll(caseId)
      .then((initialDifferentials) => {
        setCaseDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          <NewDifferential caseId={caseId} />
        </div>
      )}

      <Accordion>
        {caseDifferentials.map((d) => (
          <Differential key={d.id} id={d.id} name={d.name} description={d.description} />
        ))}
      </Accordion>
    </div>
  );
};

export default Differentials;
