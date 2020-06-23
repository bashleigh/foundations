import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerFetchSubscriptions,
  developerFetchSubscriptionsSuccess,
  developerCreateSubscription,
  developerCreateSubscriptionSuccess,
  developerCreateSubscriptionFalure,
} from '@/actions/developer-subscriptions'
import { PagedResultSubscriptionModel_ } from '@reapit/foundations-ts-definitions'

export type DeveloperSubscriptionsState = {
  create: CreateDeveloperSubscriptionsState
  list: ListDeveloperSubscriptionsState
}

export type CreateDeveloperSubscriptionsState = {
  loading: boolean
}

export type ListDeveloperSubscriptionsState = {
  data: PagedResultSubscriptionModel_ | null
  loading: boolean
}

export const defaultState: DeveloperSubscriptionsState = {
  create: {
    loading: false,
  },
  list: {
    loading: false,
    data: null,
  },
}

const developerSubscriptionsReducer = (
  state: DeveloperSubscriptionsState = defaultState,
  action: Action<any>,
): DeveloperSubscriptionsState => {
  if (isType(action, developerCreateSubscription)) {
    return {
      ...state,
      create: {
        loading: true,
      },
    }
  }

  if (isType(action, developerCreateSubscriptionSuccess)) {
    return {
      ...state,
      create: {
        loading: false,
      },
    }
  }

  if (isType(action, developerCreateSubscriptionFalure)) {
    return {
      ...state,
      create: {
        loading: false,
      },
    }
  }

  if (isType(action, developerFetchSubscriptions)) {
    return {
      ...state,
      list: {
        ...state.list,
        loading: true,
      },
    }
  }

  if (isType(action, developerFetchSubscriptionsSuccess)) {
    const { data = null } = action
    return {
      ...state,
      list: {
        loading: false,
        data,
      },
    }
  }

  return state
}

export default developerSubscriptionsReducer