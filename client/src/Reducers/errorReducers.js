const initialState = {
  invalidPass: false,
  invalidUser: false,
  invalidEmail: false,
};

const errReducers = (state = initialState, action) => {
  switch (action.type) {
    case "INVALID_EMAIL":
      return {
        ...state,
        invalidEmail: true,
      };
    case "INVALID_PASS":
      return {
        ...state,
        invalidPass: true,
      };
    case "CLEAR_ERR":
      return {
        ...state,
        invalidUser: false,
        invalidPass: false,
        invalidEmail: false,
      };
    case "INVALID_USER":
      return {
        ...state,
        invalidUser: true,
      };
    default:
      return state;
  }
};

export default errReducers;
