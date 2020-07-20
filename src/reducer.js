import {extend} from "./utils";
import {ActionType} from "./const";

const initialState = {
  mistakes: 0,
  step: -1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });
    default:
      return state;
  }
};

export {reducer};
