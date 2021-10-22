/* eslint-disable no-undef */
import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Navigationbar from '../components/Navbar';
import service from '../services/cases';

function TestingNavbar({ userValue, adminValue, guestValue }) {
  const [user, setUser] = useState(userValue);
  const [admin, setAdmin] = useState(adminValue);
  const [guest, setGuest] = useState(guestValue);

  const changeUser = () => {
    setUser(true);
    setGuest(false);
    setAdmin(false);
  };

  const changeGuest = () => {
    setUser(false);
    setGuest(true);
    setAdmin(false);
  };

  const changeAdmin = () => {
    setUser(false);
    setGuest(false);
    setAdmin(true);
  };

  return (
    <Navigationbar
      user={user}
      admin={admin}
      guest={guest}
      changeUser={changeUser}
      changeAdmin={changeAdmin}
      changeGuest={changeGuest}
    />
  );
}

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.spyOn(service, 'getAll');

test('frontpage is valid for guest', () => {
  const thisIsTrue = true;
  const thisIsFalse = false;
  const component = render(
    <TestingNavbar
      userValue={thisIsFalse}
      adminValue={thisIsFalse}
      guestValue={thisIsTrue}
    />,
  );

  const element = component.getByText(
    'Tervetuloa taudinpurkauspelin pariin!',
  );

  expect(element).toBeDefined();
});

test('frontpage is valid for student', () => {
  const thisIsTrue = true;
  const thisIsFalse = false;
  const component = render(
    <TestingNavbar
      userValue={thisIsTrue}
      adminValue={thisIsFalse}
      guestValue={thisIsFalse}
    />,
  );

  const element = component.getByText(
    'Etusivu',
  );

  expect(element).toBeDefined();
});
