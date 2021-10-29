/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CaseCard from './CaseCard';
import Search from './Search';

const Frontpage = ({ cases, admin }) => {
  const { t } = useTranslation();
  const [newSearch, setNewSearch] = useState('');

  const searchCases = (event) => {
    setNewSearch(event.target.value);
  };

  const casesToShow = !newSearch
    ? cases : cases.filter((c) => c.title.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div id="wrapper">
      <h2>{t('frontpage_title')}</h2>
      <p>{t('frontpage_text')}</p>
      <Search newSearch={newSearch} searchCases={searchCases} />
      <br />
      {admin && (
        <div>
          <Button as={Link} to="/newcase">{t('button_newCase')}</Button>
          <br />
          <h3>{t('case_hidden')}</h3>
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
      <h3>{t('case_playable')}</h3>
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
