import { AuthActions, SIGNUP, SIGNIN, LOGOUT, SET_TOKEN } from './auth.actions';
export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions ) {
  switch (action.type) {
    case SIGNUP:
      return ;
    case SIGNIN:
      return { ...state, authenticated: true };
    case LOGOUT:
      return { ...state, toke: null, authenticated: false };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
