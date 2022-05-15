import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getUsers } from './reducers/userReducer';

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users);

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
          {users.map((user) => (
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
