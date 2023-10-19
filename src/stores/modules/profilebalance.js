// STATE
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  profile_image: "",
  balance: 0,
};

// REDUCER
const useReduceProfileBalance = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_FIRST_NAME":
      return {
        ...state,
        first_name: actions.value,
      };
    case "SET_LAST_NAME":
      return {
        ...state,
        last_name: actions.value,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: actions.value,
      };
    case "SET_PHOTO_PROFILE":
      return {
        ...state,
        profile_image: actions.value,
      };
    case "SET_BALANCE":
      return {
        ...state,
        balance: actions.value,
      };

    default:
      return state;
  }
};

export default useReduceProfileBalance;
