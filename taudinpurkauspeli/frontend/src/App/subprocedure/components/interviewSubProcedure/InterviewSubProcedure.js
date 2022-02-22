import React, { useRef } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import NewOptionGroupForm from './NewOptionGroupForm';
import { createOptionGroup } from '../../reducers/optionGroupsReducer';
import { setSuccess, setError } from '../../../../utils/MessageBanner';
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
  const dispatch = useDispatch();
  const modalRef = useRef();

  const handleOptionGroupAdd = (optionGroup) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(createOptionGroup(1, optionGroup));
      setSuccess(t('optionGroupAddSuccess'));
    } catch (error) {
      setError(t('optionGroupAddError'));
    }
  };

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
            <AddUpdateModal buttonLabel={t('buttonAddNewOptionGroup')} titleLabel={t('addOptionGroup')} ref={modalRef}>
              <NewOptionGroupForm addOptionGroup={handleOptionGroupAdd} />
            </AddUpdateModal>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default InterviewSubProcedure;
