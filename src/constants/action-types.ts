/**
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // Auth actions
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHANGE_LOGIN_TYPE: 'AUTH_CHANGE_LOGIN_TYPE',
  AUTH_SET_REFRESH_SESSION: 'AUTH_SET_REFRESH_SESSION',

  // Error actions
  ERROR_THROWN_COMPONENT: 'ERROR_THROWN_COMPONENT',
  ERROR_THROWN_SERVER: 'ERROR_THROWN_SERVER',
  ERROR_CLEARED_COMPONENT: 'ERROR_CLEARED_COMPONENT',
  ERROR_CLEARED_SERVER: 'ERROR_CLEARED_SERVER',

  // Home actions
  HOME_REQUEST_DATA: 'HOME_REQUEST_DATA',
  HOME_REQUEST_FAILURE: 'HOME_REQUEST_FAILURE',
  HOME_LOADING: 'HOME_LOADING',
  HOME_RECEIVE_DATA: 'HOME_RECEIVE_DATA',
  HOME_CLEAR_DATA: 'HOME_CLEAR_DATA',

  // Checklist Detail actions
  CHECKLIST_DETAIL_REQUEST_DATA: 'CHECKLIST_DETAIL_REQUEST_DATA',
  CHECKLIST_DETAIL_LOADING: 'CHECKLIST_DETAIL_LOADING',
  CHECKLIST_DETAIL_RECEIVE_DATA: 'CHECKLIST_DETAIL_RECEIVE_DATA',
  CHECKLIST_DETAIL_SHOW_MODAL: 'CHECKLIST_DETAIL_SHOW_MODAL',
  CHECKLIST_DETAIL_HIDE_MODAL: 'CHECKLIST_DETAIL_HIDE_MODAL',
  CHECKLIST_DETAIL_SUBMIT_FORM: 'CHECKLIST_DETAIL_SUBMIT_FORM',
  CHECKLIST_DETAIL_UPDATE_DATA: 'CHECKLIST_DETAIL_UPDATE_DATA',
  CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA: 'CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA',
  CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA: 'CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA',
  CHECKLIST_DETAIL_MODAL_LOADING: 'CHECKLIST_DETAIL_MODAL_LOADING',
  CHECKLIST_DETAIL_SEARCH_PEP: 'CHECKLIST_DETAIL_SEARCH_PEP',
  CHECKLIST_DETAIL_SEARCH_PEP_RESULT: 'CHECKLIST_DETAIL_SEARCH_PEP_RESULT',
  CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA: 'CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA',
  CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA: 'CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA',

  // Result
  RESULT_SET_SEARCH_PARAMS: 'RESULT_SET_SEARCH_PARAMS',
  RESULT_REQUEST_DATA: 'RESULT_REQUEST_DATA',
  RESULT_REQUEST_FAILURE: 'RESULT_REQUEST_FAILURE',
  RESULT_LOADING: 'RESULT_LOADING',
  RESULT_RECEIVE_DATA: 'RESULT_RECEIVE_DATA',

  // Identify document types action
  IDENTITY_TYPES_REQUEST_DATA: 'IDENTITY_TYPES_REQUEST_DATA',
  IDENTITY_TYPES_RECEIVE_DATA: 'IDENTITY_TYPES_RECEIVE_DATA',
  IDENTITY_TYPES_REQUEST_FAILURE: 'IDENTITY_TYPES_REQUEST_FAILURE'
}

export default ActionTypes
