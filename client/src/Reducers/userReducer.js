const initialState = {
  isLogged: false,
  grades: [],
  verified: false,
  isLoading: false,
  isLoaded: false,
  isExpired: false,
  emailError: false,
  emailSent: false,
};

const userReducer = (state = initialState, action) => {
  let courses = [...state.grades];
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCHING_TOKEN":
      return {
        ...state,
        isLoading: true,
      };
    case "EXPIRED_SESSION":
      return {
        ...state,
        isExpired: true,
      };
    case "USER_NOT_LOADED":
      return {
        ...state,
        isLogged: false,
        isLoaded: true,
        isLoading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogged: true,
        isLoaded: true,
        isLoading: false,
        grades: action.payload.courses,
        verified: action.payload.verified,
      };
    case "EMAIL_SENT":
      return {
        ...state,
        emailSent: true,
      };
    case "SEND_EMAIL_ERROR":
      return {
        ...state,
        emailError: true,
        emailSent: false,
      };
    case "EMAIL_VERIFIED":
      return {
        ...state,
        verified: true,
      };
    case "COURSE_ADDED":
      courses.push(action.payload);
      return {
        ...state,
        grades: courses,
        isLogged: true,
      };
    case "COURSE_REMOVED":
      courses.splice(action.payload, 1);
      return {
        ...state,
        grades: courses,
        isLogged: true,
      };
    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        verified: action.payload.verified,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
      };
    default:
      return state;
  }
};

export default userReducer;
