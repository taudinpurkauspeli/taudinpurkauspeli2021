import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavLink,
  NavDropdown,
} from 'react-bootstrap';

// Import translations
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';

// Import components
import Frontpage from '../frontpage/Frontpage';
import GuestFrontpage from '../frontpage/GuestFrontpage';
import Sidebar from './Sidebar';
import HowToPlay from '../instructions/HowToPlay';
import Profile from '../user/Profile';
import Case from '../case/Case';
import EditCase from '../case/EditCase';
import service from '../../services/cases';
import NewCase from '../case/NewCase';

const Navigationbar = ({
  user, admin, guest, changeUser, changeAdmin, changeGuest,
}) => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);

  React.useEffect(() => {
    service
      .getAll()
      .then((initialCases) => {
        setCases(initialCases);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Navbar.Brand as={Link} to="/">{t('nameOfTheGame')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title={t('selectUser')}>
              <NavDropdown.Item onClick={() => changeGuest()} eventKey="guest">{t('guest')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeUser()} eventKey="student">{t('student')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeAdmin()} eventKey="teacher">{t('teacher')}</NavDropdown.Item>
            </NavDropdown>
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
            { (user || guest || admin) && (
            <Nav.Item>
              <NavLink as={Link} to="/howtoplay">{t('howToPlay')}</NavLink>
            </Nav.Item>
            )}
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

      { guest
        ? ' '
        : <Sidebar /> }

      <Switch>
        <Route path="/howtoplay">
          <HowToPlay />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/cases/:id">
          <Case cases={cases} />
        </Route>
        { admin && (
        <Route path="/editcase/:id">
          <EditCase cases={cases} />
        </Route>
        )}
        { admin && (
        <Route path="/newcase">
          <NewCase />
        </Route>
        )}

        <Route path="/">
          { guest
            ? <GuestFrontpage />
            : <Frontpage admin={admin} cases={cases} /> }
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigationbar;
