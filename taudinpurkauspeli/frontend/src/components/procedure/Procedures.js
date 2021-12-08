/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import NewProcedure from './NewProcedure';
import ProcedureList from './ProcedureList';
import service from '../../services/procedures/procedures';
import serviceUnderCases from '../../services/procedures/proceduresUnderCase';
import { setSuccess, setError } from '../../utils/MessageBanner';

const Procedures = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const handleProcedureAdd = (procedureObject) => {
    service.create(procedureObject)
      .then((data) => {
        setSuccess(t('procedureAddSuccess'));
        const procedureUnderCaseObject = ({
          caseId: id,
          procedureId: data.id,
          priority: 1,
        });

        serviceUnderCases.create(procedureUnderCaseObject);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setError(t('procedureAddError'));
      });
  };

  return (
    <div id="wrapper">
      <NewProcedure addProcedure={handleProcedureAdd} id={id} />
      <ProcedureList id={id} />
    </div>
  );
};

export default Procedures;
