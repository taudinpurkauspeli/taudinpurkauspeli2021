/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion, Card, Alert,
} from 'react-bootstrap';
import service from '../../services/differentials';
import serviceUnderCases from '../../services/differentialsUnderCases';
import NewDifferential from './NewDifferential';

const Differential = ({ admin, caseId }) => {
  const { t } = useTranslation();

  const [caseDifferentials, setCaseDifferentials] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const newDifferentialRef = useRef();

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

  const handleSuccess = () => {
    newDifferentialRef.current.toggleVisibility();
    setAlertMessage(t('differentialUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    newDifferentialRef.current.toggleVisibility();
    setErrorMessage(t('differentialUpdateError'));
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const handleDifferentialChoose = (ducObject) => {
    serviceUnderCases.create(ducObject)
      .then(() => handleSuccess())
      .catch((error) => handleError(error));
  };

  const handleDifferentialAdd = (differentialObject) => {
    service.create({ name: differentialObject.name })
      .then((res) => {
        const differentialId = res[0].id;
        handleDifferentialChoose({
          caseId,
          differentialId,
          description: differentialObject.description,
        });
      });
  };

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          { alertMessage !== null && (
          <Alert variant="success">{alertMessage}</Alert>
          )}
          { errorMessage !== null && (
          <Alert variant="danger">{errorMessage}</Alert>
          )}
          <NewDifferential
            addDifferential={handleDifferentialAdd}
            chooseDifferential={handleDifferentialChoose}
            caseId={caseId}
            ref={newDifferentialRef}
          />
        </div>
      )}

      <Accordion>
        {caseDifferentials.map((d) => (
          <Card key={d.id}>
            <Accordion.Toggle as={Card.Header} eventKey={d.id}>
              {d.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={d.id}>
              <Card.Body>{d.description}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default Differential;
