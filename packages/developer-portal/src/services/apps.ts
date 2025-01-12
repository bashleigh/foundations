import {
  CreateAppModel,
  AppSummaryModelPagedResult,
  AppDetailModel,
  AppRevisionModelPagedResult,
  CreateAppRevisionModel,
  AppRevisionModel,
  ApproveModel,
  RejectRevisionModel,
  AppClientSecretModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, fetcherWithReturnHeader, fetcherWithRawUrl, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { logger, getPlatformHeaders } from '@reapit/utils-react'
import { FetchByIdCommonParams, FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchAppsListParams = FetchListCommonParams & {
  developerId?: string[]
  clientId?: string
  externalAppId?: string[]
  category?: string[]
  desktopIntegrationTypeId?: string
  appName?: string
  developerName?: string
  companyName?: string
  isFeatured?: boolean
  isDirectApi?: boolean
  onlyInstalled?: boolean
  registeredFrom?: string
  registeredTo?: string
}

export type FetchAppByIdParams = FetchByIdCommonParams & {
  clientId?: string
}

export type CreateAppParams = CreateAppModel & {
  successCallback?: (appDetail: AppDetailModel) => void
}

export type DeleteAppByIdParams = FetchByIdCommonParams & {
  successCallback?: () => void
}

export type FeatureAppByIdParams = FetchByIdCommonParams

export type UnfeatureAppByIdParams = FetchByIdCommonParams

export type FetchAppRevisionsListParams = FetchListCommonParams & {
  id: string
}

export type CreateAppRevisionParams = FetchByIdCommonParams & {
  successCallback?: () => void
  errorCallback?: () => void
} & CreateAppRevisionModel

export type FetchAppRevisionsByIdParams = FetchByIdCommonParams & {
  revisionId: string
}

export type ApproveAppRevisionByIdParams = FetchByIdCommonParams & { revisionId: string } & ApproveModel

export type RejectAppRevisionByIdParams = FetchByIdCommonParams & {
  revisionId: string
  successCallback?: () => void
} & RejectRevisionModel

export type FetchAppSecretByIdParams = FetchByIdCommonParams

export const fetchAppsListAPI = async (params: FetchAppsListParams): Promise<AppSummaryModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchAppByIdByRawUrl = async (url: string): Promise<AppDetailModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcherWithRawUrl({
        url,
        method: 'GET',
        headers,
      })

      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchAppById = async (params: FetchAppByIdParams): Promise<AppDetailModel | void> => {
  try {
    const { id, clientId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}?${setQueryParams({ clientId })}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createAppAPI = async (params: CreateAppParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcherWithReturnHeader({
        url: URLS.apps,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const deleteAppById = async (params: DeleteAppByIdParams) => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const featureAppById = async (params: FeatureAppByIdParams) => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/feature`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const unfeatureAppById = async (params: UnfeatureAppByIdParams) => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/feature`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchAppRevisionsList = async (
  params: FetchAppRevisionsListParams,
): Promise<AppRevisionModelPagedResult | void> => {
  try {
    const { id, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/revisions?${setQueryParams(rest)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createAppRevisionAPI = async (params: CreateAppRevisionParams) => {
  try {
    const { id, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/revisions`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error
  }
}

export const fetchAppRevisionsById = async (params: FetchAppRevisionsByIdParams): Promise<AppRevisionModel | void> => {
  try {
    const { id, revisionId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const approveAppRevisionById = async (params: ApproveAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}/approve`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const rejectAppRevisionById = async (params: RejectAppRevisionByIdParams) => {
  try {
    const { id, revisionId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/revisions/${revisionId}/reject`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchAppSecretByIdAPI = async (params: FetchAppSecretByIdParams): Promise<AppClientSecretModel | void> => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.apps}/${id}/secret`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchDesktopIntegrationTypes = async () => {
  const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

  if (headers) {
    const response = await fetcher({
      url: URLS.desktopIntegrationTypes,
      method: 'GET',
      api: window.reapit.config.platformApiUrl,
      headers,
    })
    return response
  }
}

export const fetchAppDetail = async ({ clientId, id }) => {
  const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

  if (headers) {
    const response = await fetcher({
      url: clientId ? `${URLS.apps}/${id}?clientId=${clientId}` : `${URLS.apps}/${id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return response
  }
}

export const fetchAppApiKey = async ({ installationId }) => {
  const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

  if (headers) {
    const response = await fetcher({
      url: `${URLS.installations}/${installationId}/apiKey`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return response
  }
}
