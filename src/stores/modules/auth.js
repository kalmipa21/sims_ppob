//GET DATA FROM LOCAL STORAGE
const token = localStorage.getItem("token") || null;
//STATE
const initialState = {
  token,
};

//REDUCER
const useReducerAuth = (state = initialState, actions) => {
  switch (actions.type) {
    case "AUTH_TOKEN":
      return {
        ...state,
        token: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerAuth;
