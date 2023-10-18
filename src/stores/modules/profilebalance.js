// STATE
const initialState = {
  username: "",
  profile_image: "",
  balance: 0,
};

// REDUCER
const useReduceProfileBalance = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: actions.value,
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
