import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import { fetchNegotiatorsFailure, fetchNegotiatorsSuccess } from '@/actions/negotiators'
import ActionTypes from '@/constants/action-types'
import { fetchNegotiatorsApi, FetchNegotiatorsParams } from '@/services/negotiators'

export const fetchNegotiators = function*({ data }: Action<FetchNegotiatorsParams>) {
  try {
    const negotiators = yield call(fetchNegotiatorsApi, { ...data })
    yield put(fetchNegotiatorsSuccess(negotiators))
  } catch (err) {
    yield put(fetchNegotiatorsFailure(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchNegotiatorsListen = function*() {
  yield takeLatest<Action<FetchNegotiatorsParams>>(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES, fetchNegotiators)
}

export const negotiatorsSagas = function*() {
  yield all([fork(fetchNegotiatorsListen)])
}
