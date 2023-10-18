// STATE
const initialState = {
  service: "",
};

// REDUCER
function useReducerService(state = initialState, actions) {
  switch (actions.type) {
    case "SET_SERVICE":
      return {
        ...state,
        service: actions.value,
      };
    default:
      return state;
  }
}

export default useReducerService;
