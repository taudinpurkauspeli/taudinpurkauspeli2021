import usersService from '../usersService';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data;
    default:
      return state;
  }
};

export const getUsers = () => async (dispatch) => {
  const returnedUsers = await usersService.getAll();
  dispatch({
    type: 'GET_USERS',
    data: returnedUsers || null,
  });
};

export default userReducer;
