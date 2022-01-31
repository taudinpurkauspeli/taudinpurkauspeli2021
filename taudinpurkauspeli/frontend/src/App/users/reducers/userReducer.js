const userReducer = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
