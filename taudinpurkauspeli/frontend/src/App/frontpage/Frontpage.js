import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createCase } from '../case/casesReducer';

import AddCaseForm from '../case/components/AddCaseForm';
import CaseCard from '../case/components/CaseCard';
import SearchField from '../../utils/SearchField';
import AddUpdateModal from '../../utils/AddUpdateModal';

const Frontpage = ({ admin }) => {
  const { t } = useTranslation();
  const [newSearch, setNewSearch] = useState('');
  const dispatch = useDispatch();
  const modalRef = useRef();
  const cases = useSelector((state) => state.cases);

  /* istanbul ignore next */
  const handleCaseAdd = (newCase) => {
    modalRef.current.toggleVisibility();
    dispatch(createCase(newCase, t('caseAddSuccess'), t('caseAddError')));
  };

  const searchCases = (event) => {
    setNewSearch(event.target.value);
  };

  const casesToShow = !newSearch
    ? cases : cases.filter((c) => c.title.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div id="wrapper">
      <h2>{t('frontpageTitle')}</h2>
      <p>{t('frontpageText')}</p>
      <SearchField newSearch={newSearch} onChange={searchCases} placeholder={t('searchByTitle')} />
      <br />
      {admin && (
        <div>
          <AddUpdateModal buttonLabel={t('buttonNewCase')} titleLabel={t('addCase')} ref={modalRef}>
            <AddCaseForm addCase={handleCaseAdd} />
          </AddUpdateModal>
          <br />
          <h3>{t('caseHidden')}</h3>
          <hr />
        </div>
      )}
      <Row xs="auto" md="auto" className="g-4">
        {admin && (
          casesToShow.filter((c) => c.hidden).map((c) => (
            <Col key={c.id}>
              <CaseCard c={c} admin={admin} />
            </Col>
          ))
        )}
      </Row>
      <br />
      <h3>{t('casePlayable')}</h3>
      <hr />
      <Row xs="auto" md="auto" className="g-4">
        {casesToShow.filter((c) => !c.hidden).map((c) => (
          <Col key={c.id}>
            <CaseCard c={c} admin={admin} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Frontpage;
