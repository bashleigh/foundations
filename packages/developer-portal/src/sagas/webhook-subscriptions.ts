import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'
import {
  webhookSubscriptionsReceiveData,
  webhookTopicsReceiveData,
  setApplicationId,
} from '@/actions/webhook-subscriptions'
import { fetchWebhooksSubscriptionsList, fetchWebhooksTopicsList } from '@/services/webhooks'

export const webhookSubscriptionsFetch = function*({ data: applicationId }: Action<string>) {
  try {
    yield put(setApplicationId(applicationId))
    const response = yield call(fetchWebhooksSubscriptionsList, { applicationId: [applicationId] })
    if (response) {
      yield put(webhookSubscriptionsReceiveData(response))
    }
  } catch (error) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const webhookTopicsFetch = function*({ data: applicationId }: Action<string>) {
  try {
    const response = yield call(fetchWebhooksTopicsList, { applicationId })
    if (response) {
      yield put(webhookTopicsReceiveData(response))
    }
  } catch (error) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const webhookSubscriptionsListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA, webhookSubscriptionsFetch)
}

export const webhookTopicsListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA, webhookTopicsFetch)
}

const webhookSubscriptionsSagas = function*() {
  yield all([fork(webhookSubscriptionsListen), fork(webhookTopicsListen)])
}

export default webhookSubscriptionsSagas