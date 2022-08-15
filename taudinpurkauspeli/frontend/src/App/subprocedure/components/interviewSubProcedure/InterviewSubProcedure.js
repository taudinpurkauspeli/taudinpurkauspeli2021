import React, { useRef } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import AddOptionGroupForm from '../option/optionGroup/AddOptionGroupForm';
import { createOptionGroup } from '../../reducers/optionGroupsReducer';
import OptionGroupList from '../option/optionGroup/OptionGroupList';

const InterviewSubProcedure = ({ d, admin }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleOptionGroupAdd = (optionGroup) => {
    modalRef.current.toggleVisibility();
    dispatch(createOptionGroup(d.id, optionGroup, t('optionGroupAddSuccess'), t('optionGroupAddError')));
  };

  return (
    <div>
      <Card style={{ width: '60rem' }}>
        <Accordion.Toggle as={Card.Header} eventKey={d.id}>
          <div className="d-flex justify-content-between align-items-center">
            {d.name}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={d.id}>
          <Card.Body>
            { admin
            && (
            <AddUpdateModal buttonLabel={t('buttonAddNewOptionGroup')} titleLabel={t('addOptionGroup')} ref={modalRef}>
              <AddOptionGroupForm addOptionGroup={handleOptionGroupAdd} />
            </AddUpdateModal>
            )}
            <OptionGroupList subProcedureId={d.id} admin={admin} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default InterviewSubProcedure;
