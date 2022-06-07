import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getUsers } from './reducers/userReducer';
import SearchField from '../../utils/SearchField';

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [usernameSearch, setusernameSearch] = useState('');
  const [studentIdSearch, setStudentIdSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [groupSearch, setGroupSearch] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users);

  const handleUsernameSearch = (event) => {
    setusernameSearch(event.target.value);
  };

  const handleStudentIdSearch = (event) => {
    setStudentIdSearch(event.target.value);
  };

  const handleEmailSearch = (event) => {
    setEmailSearch(event.target.value);
  };

  const handleGroupSearch = (event) => {
    setGroupSearch(event.target.value);
  };

  const usersToShow = users.filter((u) => (
    u.user_name.toLowerCase().includes(usernameSearch.toLowerCase())
    && u.studentid.includes(studentIdSearch)
    && u.mail.toLowerCase().includes(emailSearch.toLowerCase())
    && u.group.toLowerCase().includes(groupSearch.toLowerCase())
  ));

  return (
    <div id="wrapper">
      <h2>{t('userInformation')}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('user')}</th>
            <th>{t('studentId')}</th>
            <th>{t('email')}</th>
            <th>{t('group')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <SearchField newSearch={usernameSearch} onChange={handleUsernameSearch} placeholder={t('searchByUsername')} />
            </td>
            <td>
              <SearchField newSearch={studentIdSearch} onChange={handleStudentIdSearch} placeholder={t('searchByStudentId')} />
            </td>
            <td>
              <SearchField newSearch={emailSearch} onChange={handleEmailSearch} placeholder={t('searchByEmail')} />
            </td>
            <td>
              <SearchField newSearch={groupSearch} onChange={handleGroupSearch} placeholder={t('searchByGroup')} />
            </td>
          </tr>
          {usersToShow.map((user) => (
            <tr key={user.id}>
              <td>{user.user_name}</td>
              <td>{user.studentid}</td>
              <td>{user.mail}</td>
              <td>{user.group}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
