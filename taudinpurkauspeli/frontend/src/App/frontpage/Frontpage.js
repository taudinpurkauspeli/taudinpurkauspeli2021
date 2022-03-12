/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setSuccess, setError } from '../../utils/MessageBanner';
import { createCase } from '../case/casesReducer';

import NewCaseForm from '../case/components/NewCaseForm';
import CaseCard from '../case/components/CaseCard';
import Search from './Search';
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
    try {
      dispatch(createCase(newCase));
      setSuccess(t('caseAddSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('caseAddError'));
    }
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
      <Search newSearch={newSearch} searchCases={searchCases} />
      <br />
      {admin && (
        <div>
          <AddUpdateModal buttonLabel={t('buttonNewCase')} titleLabel={t('addCase')} ref={modalRef}>
            <NewCaseForm addCase={handleCaseAdd} />
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
