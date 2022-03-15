import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavLink,
  NavDropdown,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Import translations
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';

const Navigationbar = () => {
  const admin = useSelector((state) => state.admin);
  const { t } = useTranslation();

  /* istanbul ignore next */
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    window.location.reload(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">{t('nameOfTheGame')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={t('selectLanguage')} id="selectLanguage" className="navItems">
            <NavDropdown.Item onClick={() => changeLanguage('fi')} eventKey="fi">{t('languageFinnish')}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('en')} eventKey="en">{t('languageEnglish')}</NavDropdown.Item>
          </NavDropdown>
          { admin && (
          <Nav.Item>
            <NavLink as={Link} to="/users" className="navItems">{t('userInformation')}</NavLink>
          </Nav.Item>
          )}
          { admin && (
          <Nav.Item>
            <NavLink as={Link} to="/files" className="navItems">{t('fileBank')}</NavLink>
          </Nav.Item>
          )}
          <Nav.Item>
            <NavLink as={Link} to="/howtoplay" className="navItems">{t('howToPlay')}</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink as={Link} to="/profile" className="navItems">{t('userProfile')}</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink href="https://taudinpurkauspeli-taudinpurkauspeli2021.apps.ocp-prod-0.k8s.it.helsinki.fi/Shibboleth.sso/Logout" className="navItems">{t('logOut')}</NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
