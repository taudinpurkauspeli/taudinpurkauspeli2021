import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import OptionList from '../OptionList';
// import NewOptionForm from '../NewOptionForm';
// import AddUpdateModal from '../../../../utils/AddUpdateModal';

const OptionGroup = ({ name }) => {
  const { t } = useTranslation();
  /*
  const handleOptionAdd = () => {
    console.log('ello');
  };
  */
  return (
    <Card style={{ width: '60rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        {/*
        <OptionList subProcedureCaseId={subProcedureCaseId} />
        {admin && (
        <AddUpdateModal>
          <NewOptionForm
            subProcedureCaseId={subProcedureCaseId}
            addOption={handleOptionAdd}
          />
        </AddUpdateModal>
        )}
        */}
        {t('write')}
      </Card.Body>
    </Card>
  );
};

export default OptionGroup;
