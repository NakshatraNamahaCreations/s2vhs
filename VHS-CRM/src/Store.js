import { createStore } from "redux";

const Default_State = {
  userloggin: null,
};

const MyFormReducer = (state = Default_State, action) => {
  if (action.type === "set_login_data") {
    return { userloggin: action.payload };
  }
  return state;
};

const store = createStore(MyFormReducer);
export default store;