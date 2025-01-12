import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type EndpointStatisticsModel = {
  endpoint?: string
  requestCount?: number
}

export type DateStatisticsModel = {
  date?: string
  requestCount?: number
}

export type CustomerStatisticsModel = {
  customerId?: string
  requestCount?: number
}

export type FetchTrafficStatisticsParams = {
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export type TrafficEventsStatisticsSummaryModel = {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: EndpointStatisticsModel[]
  requestsByDate?: DateStatisticsModel[]
  requestsByCustomer?: CustomerStatisticsModel[]
}

export const fetchTrafficStatistics = async (
  params: FetchTrafficStatisticsParams,
): Promise<TrafficEventsStatisticsSummaryModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.trafficEventStatistics}?${setQueryParams(params)}`,
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
