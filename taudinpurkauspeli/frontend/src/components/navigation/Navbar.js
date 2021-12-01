/* eslint-disable linebreak-style */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavLink,
  NavDropdown,
} from 'react-bootstrap';

// Import translations
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';

const Navigationbar = ({
  user, admin,
}) => {
  const { t } = useTranslation();

  /* istanbul ignore next */
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">{t('nameOfTheGame')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={t('selectLanguage')}>
            <NavDropdown.Item onClick={() => changeLanguage('fi')} eventKey="fi">{t('languageFinnish')}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('en')} eventKey="en">{t('languageEnglish')}</NavDropdown.Item>
          </NavDropdown>
          { admin && (
          <Nav.Item>
            <NavLink as={Link} to="/users">{t('userInformation')}</NavLink>
          </Nav.Item>
          )}
          { admin && (
          <Nav.Item>
            <NavLink as={Link} to="/files">{t('fileBank')}</NavLink>
          </Nav.Item>
          )}
          <Nav.Item>
            <NavLink as={Link} to="/howtoplay">{t('howToPlay')}</NavLink>
          </Nav.Item>
          { user && (
          <Nav.Item>
            <NavLink as={Link} to="/profile">{t('userProfile')}</NavLink>
          </Nav.Item>
          )}
          <Nav.Item>
            { (user || admin)
              ? <NavLink as={Link} to="/logout">{t('logOut')}</NavLink>
              : <NavLink as={Link} to="/login">{t('logIn')}</NavLink> }
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
