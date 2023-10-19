// STATE
const initialState = {
  service_code: "",
  service_tariff: "",
  service_name: "",
  service_icon: "",
};

// REDUCER
function useReducerService(state = initialState, actions) {
  switch (actions.type) {
    case "SET_SERVICE_CODE":
      return {
        ...state,
        service_code: actions.value,
      };
    case "SET_SERVICE_TARIF":
      return {
        ...state,
        service_tariff: actions.value,
      };
    case "SET_SERVICE_NAME":
      return {
        ...state,
        service_name: actions.value,
      };
    case "SET_SERVICE_ICON":
      return {
        ...state,
        service_icon: actions.value,
      };
    default:
      return state;
  }
}

export default useReducerService;
