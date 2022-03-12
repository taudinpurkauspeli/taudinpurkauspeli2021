import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import DifferentialList from '../DifferentialList';
import AddDifferentialForm from '../AddDifferentialForm';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import { createDifferential } from '../../reducers/differentialsReducer';
import { setSuccess, setError } from '../../../../utils/MessageBanner';

const DifferentialGroup = ({
  diffGroupCaseId, name, admin,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleDifferentialAdd = (differentialObject) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(createDifferential(diffGroupCaseId, differentialObject));
      setSuccess(t('differentialUpdateSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('differentialUpdateError'));
    }
  };

  return (
    <Card style={{ width: '60rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <DifferentialList diffGroupCaseId={diffGroupCaseId} />
        {admin && (
          <AddUpdateModal buttonLabel={t('buttonNewDifferential')} titleLabel={t('addDifferential')} ref={modalRef}>
            <AddDifferentialForm addDifferential={handleDifferentialAdd} />
          </AddUpdateModal>
        )}
      </Card.Body>
    </Card>
  );
};

export default DifferentialGroup;
