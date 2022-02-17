import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import NewOptionGroupForm from './NewOptionGroupForm';
// import UpdateInterviewSubProcedure from './UpdateInterviewSubProcedure';
/*
{admin && (
            <div className="cardButtons">
              <UpdateInterviewSubProcedure d={d} />
            </div>
          )}
          */
const InterviewSubProcedure = ({ d, admin }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={d.id}>
          <div className="d-flex justify-content-between align-items-center">
            {d.title}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={d.id}>
          <Card.Body>
            { admin
            && (
            <AddUpdateModal buttonLabel={t('buttonAddNewOptionGroup')} titleLabel={t('addOptionGroup')}>
              <NewOptionGroupForm />
            </AddUpdateModal>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default InterviewSubProcedure;
