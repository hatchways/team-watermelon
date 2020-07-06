import * as ACTION_TYPES from './ActionTypes'



export const login_success = (pay_load) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload: pay_load
  }
}

export const login_failure = (pay_load) => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
    payload: pay_load
  }
}

